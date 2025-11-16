import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../lib/mongodb";
import { GraphQLError } from "graphql";
import {
  createAccessToken,
  createRefreshToken,
  getRefreshCookie,
  clearRefreshCookie,
} from "../lib/auth";
import { UpdateSignupEmailArgs } from "@/types/types";

// ✅ Define shared context and argument types
interface GraphQLContext {
  userId?: string;
  res?: {
    setHeader: (key: string, value: string | string[]) => void;
  };
}

interface SignupArgs {
  name?: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface VerifyPasswordArgs {
  identifier: string;
  password: string;
}

interface SendOtpArgs {
  email: string;
}

interface VerifyOtpArgs {
  email: string;
  otp: string;
}

interface JwtPayload {
  userId: string;
  email: string;
}

export const resolvers = {
  Query: {
    // ✅ me query
    me: async (_parent: unknown, _args: Record<string, never>, context: GraphQLContext) => {
      if (!context.userId) return null;
      return await User.findById(context.userId);
    },
  },

  Mutation: {
    // ✅ Signup
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

    // ✅ Login
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

    // ✅ Logout
    logout: async (_parent: unknown, _args: Record<string, never>, context: GraphQLContext) => {
      if (context.res) {
        const clear = clearRefreshCookie();
        context.res.setHeader("Set-Cookie", clear);
      }
      return { success: true };
    },

    // ✅ Verify Password
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
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      console.log(`Generated OTP for ${email}: ${otp}`);

      // You could persist OTP in DB or cache here for real implementation
      return {
        success: true,
        message: "OTP sent successfully",
        otp, // Dev only; remove later
      };
    },

    updateSignupEmail: async (_parent: unknown, { oldEmail, newEmail }: UpdateSignupEmailArgs) => {
      try {
        console.log("➡️ updateSignupEmail resolver called", { oldEmail, newEmail });

        // 1️⃣ ensure DB is connected
        await dbConnect();

        // 2️⃣ Look for user with the old email
        const existingUser = await User.findOne({ email: oldEmail });

        if (!existingUser) {
          console.log("❌ oldEmail not found:", oldEmail);
          return {
            success: false,
            message: "Original email not found. Restart signup process.",
          };
        }

        // 3️⃣ Check if new email already exists (duplicate prevention)
        const userWithNewEmail = await User.findOne({ email: newEmail });

        if (userWithNewEmail) {
          console.log("❌ newEmail already exists:", newEmail);
          return {
            success: false,
            message: "Account already exists. Please use a different email or sign in.",
          };
        }

        // 4️⃣ Update email in DB
        console.log("🔄 Updating email...");
        existingUser.email = newEmail;
        await existingUser.save();

        console.log("✅ Email update successful!");

        // 5️⃣ Return success response
        return {
          success: true,
          message: "Email updated successfully.",
        };
      } catch (err) {
        console.error("🔥 updateSignupEmail error:", err);
        return {
          success: false,
          message: "Failed to update email.",
        };
      }
    },
  },
};
