// src/app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";
import dbConnect from "../../../lib/mongodb";import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

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
