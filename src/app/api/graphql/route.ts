import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/mongodb";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create Apollo handler for the App Router (NextRequest)
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req): Promise<{ userId?: string }> => {
    await dbConnect();

    const auth = req.headers.get("authorization");
    let userId: string | undefined;

    if (auth?.startsWith("Bearer ")) {
      try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
        userId = decoded.sub;
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("JWT verification failed:", err.message);
        } else {
          console.error("JWT verification failed: unknown error", err);
        }
      }
    }

    return { userId };
  },
});

// Properly typed GET and POST handlers
/*export async function GET(request: Request): Promise<Response> {
  if (process.env.NODE_ENV === "production") {
    return new Response("GET not allowed", { status: 405 });
  }
  return handler(request);
}*/

export async function POST(request: Request): Promise<Response> {
  return handler(request);
}
