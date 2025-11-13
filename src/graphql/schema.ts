export const typeDefs = /* GraphQL */ `
  type User {
    _id: ID!
    name: String
    email: String!
    createdAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type LogoutPayload {
    success: Boolean!
  }

  type VerifyPasswordResponse {
    success: Boolean!
    message: String!
    token: String
  }

  type Query {
    me: User
  }

  type OtpResponse {
    success: Boolean!
    message: String
    otp: String
  }

  type VerificationResponse {
    success: Boolean!
    message: String
  }

  type Mutation {
    signup(name: String, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: LogoutPayload!
    verifyPassword(identifier: String!, password: String!): VerifyPasswordResponse!
    sendOtp(email: String!): OtpResponse!
    verifyOtp(email: String!, otp: String!): VerificationResponse!
  }
`;
