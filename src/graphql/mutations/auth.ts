// src/graphql/mutations/auth.ts
export const CHECK_IDENTIFIER_MUTATION = `
  mutation CheckIdentifier($identifier: String!) {
    checkIdentifier(identifier: $identifier) {
      success
      message
    }
  }
`;

export const VERIFY_PASSWORD_MUTATION = `
  mutation VerifyPassword($identifier: String!, $password: String!) {
        verifyPassword(identifier: $identifier, password: $password) {
          success
          message
          token
        }
      }
`;

export const SIGNUP_MUTATION = `
  mutation Signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
      user { _id name email }
    }
  }
`;
