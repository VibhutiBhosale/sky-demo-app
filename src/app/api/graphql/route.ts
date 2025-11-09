import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import dbConnect from "../../../lib/mongodb";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../../models/User"; // adjust path if necessary

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

/** 🔐 Helper to extract userId from Bearer token */
function getUserIdFromReq(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      const token = auth.slice(7);
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return decoded?.sub;
    }
  } catch {
    return null;
  }
  return null;
}

/** 🧩 GraphQL Schema (typeDefs) */
const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type AuthResponse {
    success: Boolean!
    message: String
    token: String
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    verifyPassword(identifier: String!, password: String!): AuthResponse!
  }
`;

/** 🧠 GraphQL Resolvers */
const resolvers = {
  Query: {
    users: async () => {
      await dbConnect();
      return User.find({});
    },
  },

  Mutation: {
    /** 🔐 verifyPassword Mutation */
    verifyPassword: async (_: any, { identifier, password }: any) => {
      try {
        await dbConnect();

        // 1️⃣ Find user by email or username
        const user = await User.findOne({
          $or: [
            { email: identifier.toLowerCase() },
            { username: identifier },
          ],
        });

        if (!user) {
          return {
            success: false,
            message: "Account not found.",
            token: null,
          };
        }

        // 2️⃣ Compare passwords securely
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return {
            success: false,
            message: "The password you entered is incorrect. Please try again or use the forgotten your password link below.",
            token: null,
          };
        }

        // 3️⃣ Generate JWT token
        const token = jwt.sign(
          { sub: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // 4️⃣ Success response
        return {
          success: true,
          message: "Login successful.",
          token,
        };
      } catch (error) {
        console.error("verifyPassword error:", error);
        return {
          success: false,
          message: "Internal server error.",
          token: null,
        };
      }
    },
  },
};

/** 🚀 Apollo Server Setup */
const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => {
    await dbConnect();
    const userId = getUserIdFromReq(req);
    return { userId };
  },
});

export const POST = handler;
export const GET = handler;
