// src/pages/api/graphql.ts
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolvers";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

const getUserIdFromReq = (req: NextApiRequest) => {
  try {
    const auth = req.headers.authorization || "";
    if (auth.startsWith("Bearer ")) {
      const token = auth.slice(7);
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return decoded?.sub;
    }
  } catch (err) {
    // ignore
  }
  return null;
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // We'll set context per request below in handler
  context: ({ req, res }: { req: NextApiRequest; res: NextApiResponse }) => {
    // dbConnect is called in start handler to avoid double connect
    const userId = getUserIdFromReq(req);
    return { userId, req, res };
  },
});

const startServer = apolloServer.start();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  await startServer;
  // Note: createHandler returns a function accepting (req,res)
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
