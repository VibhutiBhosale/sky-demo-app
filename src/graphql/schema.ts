// src/graphql/schema.ts

// ✅ no imports of gql / graphql-tag needed
export const typeDefs = /* GraphQL */ `
  """A basic article document"""
  type Article {
    _id: ID!
    title: String!
    excerpt: String
    content: String
    createdAt: String
    updatedAt: String
  }

  """A registered user"""
  type User {
    _id: ID!
    name: String
    email: String!
    createdAt: String
  }

  """Auth payload returned by signup/login"""
  type AuthPayload {
    token: String!
    user: User!
  }

  """Payload returned by logout"""
  type LogoutPayload {
    success: Boolean!
  }

  type Query {
    articles: [Article!]!
    article(id: ID!): Article
    me: User
  }

  type Mutation {
    createArticle(title: String!, excerpt: String, content: String): Article!
    signup(name: String, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: LogoutPayload!
  }
`;
