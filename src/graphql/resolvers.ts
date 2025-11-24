import User from "@/models/User";
import Otp from "@/models/Otp";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import { GraphQLError } from "graphql";
import {
  createAccessToken,
  createRefreshToken,
  getRefreshCookie,
  clearRefreshCookie,
} from "../lib/auth";
import { UpdateSignupEmailArgs } from "@/types/types";

export const resolvers = {
  Query: {
    me: async (_parent: unknown, _args: Record<string, never>, context: GraphQLContext) => {
      if (!context.userId) return null;
      return await User.findById(context.userId);
    },
  },

  Mutation: {
    // Signup
    signup: async (
      _parent: unknown,
      { name, email, password }: SignupArgs,
      context: GraphQLContext
    ) => {
      await dbConnect();

      if (!email || !password) {
        throw new GraphQLError("Email and password required", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      if (!name || !/^[A-Za-z]+ [A-Za-z]+$/.test(name.trim())) {
        throw new GraphQLError("Full name must be in 'Firstname Lastname' format", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new GraphQLError("This email is already registered.", {
          extensions: { code: "EMAIL_EXISTS" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashed,
      });

      const accessToken = createAccessToken({ sub: user._id.toString(), email: user.email });
      const refreshToken = createRefreshToken({ sub: user._id.toString(), email: user.email });

      if (context.res) {
        const cookie = getRefreshCookie(refreshToken);
        context.res.setHeader("Set-Cookie", cookie);
      }

      return {
        token: accessToken,
        user: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      };
    },

    // Login
    login: async (_parent: unknown, { email, password }: LoginArgs, context: GraphQLContext) => {
      await dbConnect();

      if (!email || !password) {
        throw new GraphQLError("Email and password required");
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) throw new GraphQLError("Invalid email or password");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new GraphQLError("Invalid email or password");

      const accessToken = createAccessToken({ sub: user._id.toString(), email: user.email });
      const refreshToken = createRefreshToken({ sub: user._id.toString(), email: user.email });

      if (context.res) {
        const cookie = getRefreshCookie(refreshToken);
        context.res.setHeader("Set-Cookie", cookie);
      }

      return {
        token: accessToken,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      };
    },

    // Logout
    logout: async (_parent: unknown, _args: Record<string, never>, context: GraphQLContext) => {
      if (context.res) {
        const clear = clearRefreshCookie();
        context.res.setHeader("Set-Cookie", clear);
      }
      return { success: true };
    },

    // Verify Password
    verifyPassword: async (
      _parent: unknown,
      { identifier, password }: VerifyPasswordArgs
    ): Promise<{ success: boolean; message: string; token?: string }> => {
      try {
        const user = await User.findOne({
          $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        });

        if (!user) {
          return {
            success: false,
            message:
              "The password you entered is incorrect. Please try again or use the forgotten your password link below.",
          };
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return {
            success: false,
            message:
              "The password you entered is incorrect. Please try again or use the forgotten your password link below.",
          };
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email } as JwtPayload,
          process.env.JWT_SECRET || "supersecret",
          { expiresIn: "1h" }
        );

        return { success: true, message: "Login successful", token };
      } catch (err) {
        console.error("verifyPassword error:", err);
        return { success: false, message: "Server error" };
      }
    },

    // Mock OTP generator
    async sendOtp(_: unknown, { email }: { email: string }) {
      await dbConnect();

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      // Replace existing OTP if user requests resend
      await Otp.findOneAndUpdate({ email }, { otp, createdAt: new Date() }, { upsert: true });

      return {
        success: true,
        message: "OTP sent successfully",
        otp, // DEV ONLY
      };
    },

    updateSignupEmail: async (_parent: unknown, { oldEmail, newEmail }: UpdateSignupEmailArgs) => {
      try {
        //ensure DB is connected
        await dbConnect();

        //Look for user with the old email
        const existingUser = await User.findOne({ email: oldEmail });

        if (!existingUser) {
          return {
            success: false,
            message: "Original email not found. Restart signup process.",
          };
        }

        //Check if new email already exists (duplicate prevention)
        const userWithNewEmail = await User.findOne({ email: newEmail });

        if (userWithNewEmail) {
          return {
            success: false,
            message: "Account already exists. Please use a different email or sign in.",
          };
        }

        //Update email in DB
        existingUser.email = newEmail;
        await existingUser.save();

        //Return success response
        return {
          success: true,
          message: "Email updated successfully.",
        };
      } catch (err) {
        return {
          success: false,
          message: "Failed to update email.",
        };
      }
    },

    verifyOtp: async (_: unknown, { email, otp }: { email: string; otp: string }) => {
      await dbConnect();

      const record = await Otp.findOne({ email });

      if (!record) {
        return {
          success: false,
          message: "OTP expired or not found.",
        };
      }

      if (record.otp !== otp) {
        return {
          success: false,
          message: "Invalid OTP.",
        };
      }

      // OTP verified — delete it so it cannot be reused
      await Otp.deleteOne({ email });

      return {
        success: true,
        message: "OTP verified successfully",
      };
    },
  },
};
