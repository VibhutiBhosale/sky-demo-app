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

export const SEND_OTP_MUTATION = `
          mutation SendOtp($email: String!) {
            sendOtp(email: $email) {
              success
              message
              otp
            }
          }
        `;

export const VERIFY_OTP = `
        mutation VerifyOtp($email: String!, $otp: String!) {
          verifyOtp(email: $email, otp: $otp) {
            success
            message
          }
        }
      `;

export const RESEND_OTP = `
        mutation ResendOtp($email: String!) {
          sendOtp(email: $email) {
            otp
            success
            message
          }
        }
      `;

export const UPDATE_SIGNUP_EMAIL_MUTATION = `
  mutation UpdateSignupEmail($oldEmail: String!, $newEmail: String!) {
    updateSignupEmail(oldEmail: $oldEmail, newEmail: $newEmail) {
      success
      message
    }
  }
`;
