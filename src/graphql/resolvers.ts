import Article from "../models/Article";

export const resolvers = {
  Query: {
    articles: async () => {
      return Article.find({}).sort({ createdAt: -1 }).lean();
    },
    article: async (_: any, { id }: { id: string }) => {
      return Article.findById(id).lean();
    }
  },
  Mutation: {
    createArticle: async (_: any, { title, excerpt, content }: any) => {
      const doc = await Article.create({ title, excerpt, content });
      return doc.toObject();
    }
  }
};
