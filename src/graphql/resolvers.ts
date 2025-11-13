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

// ✅ Simple in-memory OTP store (replace with Redis or DB in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

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

    // ✅ Send OTP (for login, verification, etc.)
    sendOtp: async (_parent: unknown, { email }: SendOtpArgs) => {
      await dbConnect();

      if (!email) {
        throw new GraphQLError("Email is required", { extensions: { code: "BAD_USER_INPUT" } });
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new GraphQLError("No user found with this email", {
          extensions: { code: "USER_NOT_FOUND" },
        });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

      otpStore.set(email.toLowerCase(), { otp, expiresAt });

      // TODO: send OTP via email or SMS
      console.log(`📩 OTP for ${email}: ${otp}`);

      return {
        success: true,
        message: "OTP generated and sent to your email.",
      };
    },

    // ✅ Verify OTP
    verifyOtp: async (_parent: unknown, { email, otp }: VerifyOtpArgs) => {
      await dbConnect();

      const entry = otpStore.get(email.toLowerCase());
      if (!entry) {
        throw new GraphQLError("OTP not found or expired", {
          extensions: { code: "OTP_NOT_FOUND" },
        });
      }

      if (Date.now() > entry.expiresAt) {
        otpStore.delete(email.toLowerCase());
        throw new GraphQLError("OTP expired", { extensions: { code: "OTP_EXPIRED" } });
      }

      if (entry.otp !== otp) {
        throw new GraphQLError("Invalid OTP", { extensions: { code: "INVALID_OTP" } });
      }

      // ✅ OTP verified, invalidate it
      otpStore.delete(email.toLowerCase());

      return {
        success: true,
        message: "OTP verified successfully.",
      };
    },
  },
};
