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

// ✅ Define JWT payload type for verifyPassword
interface JwtPayload {
  userId: string;
  email: string;
}

export const resolvers = {
  Query: {
    // ✅ Type-safe me resolver
    me: async (
      _parent: unknown,
      _args: Record<string, never>,
      context: GraphQLContext
    ) => {
      if (!context.userId) return null;
      return await User.findById(context.userId);
    },
  },

  Mutation: {
    // ✅ Signup resolver
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

      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        throw new GraphQLError("Email already in use", {
          extensions: { code: "CONFLICT" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashed,
      });

      const accessToken = createAccessToken({
        sub: user._id.toString(),
        email: user.email,
      });
      const refreshToken = createRefreshToken({
        sub: user._id.toString(),
        email: user.email,
      });

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

    // ✅ Login resolver
    login: async (
      _parent: unknown,
      { email, password }: LoginArgs,
      context: GraphQLContext
    ) => {
      await dbConnect();

      if (!email || !password) {
        throw new GraphQLError("Email and password required");
      }

      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new GraphQLError("Invalid email or password");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new GraphQLError("Invalid email or password");
      }

      const accessToken = createAccessToken({
        sub: user._id.toString(),
        email: user.email,
      });
      const refreshToken = createRefreshToken({
        sub: user._id.toString(),
        email: user.email,
      });

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

    // ✅ Logout resolver
    logout: async (
      _parent: unknown,
      _args: Record<string, never>,
      context: GraphQLContext
    ) => {
      if (context.res) {
        const clear = clearRefreshCookie();
        context.res.setHeader("Set-Cookie", clear);
      }
      return { success: true };
    },

    // ✅ VerifyPassword resolver (fully typed)
    verifyPassword: async (
      _parent: unknown,
      { identifier, password }: VerifyPasswordArgs
    ): Promise<{ success: boolean; message: string; token?: string }> => {
      try {
        const user = await User.findOne({
          $or: [
            { email: identifier.toLowerCase() },
            { username: identifier },
          ],
        });

        if (!user) {
          return { success: false, message: "Account not found." };
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return { success: false, message: "Incorrect password." };
        }

        const token = jwt.sign(
          { userId: user._id, email: user.email } as JwtPayload,
          process.env.JWT_SECRET || "supersecret",
          { expiresIn: "1h" }
        );

        return { success: true, message: "Login successful", token };
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("verifyPassword error:", err.message);
        } else {
          console.error("verifyPassword error:", err);
        }
        return { success: false, message: "Server error" };
      }
    },
  },
};
