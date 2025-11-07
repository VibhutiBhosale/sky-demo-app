import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Article {
    _id: ID!
    title: String!
    excerpt: String
    content: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    articles: [Article!]!
    article(id: ID!): Article
  }

  type Mutation {
    createArticle(title: String!, excerpt: String, content: String): Article!
  }
`;
