// src/graphql/resolvers.ts
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../lib/mongodb";
import { GraphQLError } from "graphql";
import { createAccessToken, createRefreshToken, getRefreshCookie, clearRefreshCookie, verifyRefreshToken } from "../lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

export const resolvers = {
  Query: {
    me: async (_parent: any, _args: any, context: { userId?: string }) => {
      if (!context.userId) return null;
      return await User.findById(context.userId);
    },
  },
  Mutation: {
    signup: async (
  _: any,
  { name, email, password }: { name?: string; email: string; password: string },
  context: { res?: any }
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

  if (context && context.res) {
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


    login: async (_: any, { email, password }: { email: string; password: string }, context: { res?: any }) => {
      await dbConnect();
      if (!email || !password) throw new GraphQLError("Email and password required");
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) throw new GraphQLError("Invalid email or password");
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new GraphQLError("Invalid email or password");

      const accessToken = createAccessToken({ sub: user._id.toString(), email: user.email });
      const refreshToken = createRefreshToken({ sub: user._id.toString(), email: user.email });
      if (context && context.res) {
        const cookie = getRefreshCookie(refreshToken);
        context.res.setHeader("Set-Cookie", cookie);
      }

      return { token: accessToken, user: { _id: user._id, name: user.name, email: user.email } };
    },

    logout: async (_: any, __: any, context: { res?: any }) => {
      // clear refresh cookie
      if (context && context.res) {
        const clear = clearRefreshCookie();
        context.res.setHeader("Set-Cookie", clear);
      }
      return { success: true };
    },

    verifyPassword: async (_: any, { identifier, password }: any) => {
      try {
        // 1️⃣ Find user by email or username
        const user = await User.findOne({
          $or: [
            { email: identifier.toLowerCase() },
            { username: identifier },
          ],
        });

        if (!user) {
          return { success: false, message: 'Account not found.' };
        }

        // 2️⃣ Compare provided password with stored hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return { success: false, message: 'Incorrect password.' };
        }

        // 3️⃣ Generate JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET || 'supersecret',
          { expiresIn: '1h' }
        );

        // 4️⃣ Return success response
        return { success: true, message: 'Login successful', token };
      } catch (err) {
        console.error('verifyPassword error:', err);
        return { success: false, message: 'Server error' };
      }
    },


    // Optional: rotate refresh tokens if you store them server-side (not implemented here)
  },
};
