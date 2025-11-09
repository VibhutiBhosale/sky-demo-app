import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "../../../lib/mongodb";
import { typeDefs } from "../../../graphql/schema";
import { resolvers } from "../../../graphql/resolvers";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest): Promise<{ userId?: string }> => {
    await dbConnect();
    const auth = req.headers.get("authorization");
    let userId: string | undefined;

    if (auth?.startsWith("Bearer ")) {
      try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
        userId = decoded.sub;
      } catch (err) {
        console.error("JWT verification failed:", err);
      }
    }

    return { userId };
  },
});

export { handler as GET, handler as POST };
