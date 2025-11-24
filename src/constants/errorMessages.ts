export const errorMessages = {
  login: {
    invalidIdentifier: "We can't find an account matching that email address or username.",
    apiError: "Something went wrong. Please try again.",
    requiredField: "Enter your email address or username",
  },
  enterPassword: {
    requiredField: "Enter your password.",
    incorrectPassword:
      "The password you entered is incorrect. Please try again or use the forgotten your password link below.",
    forgotPasswordLink: "Forgotten your password?",
    passwordVrificationFailed: "Password verification failed. Please try again.",
  },
  signup: {
    generalFallback: "Please fix form errors before continuing.",
    signupFailed: "This email is already registered.",
    emailAlreadyExist: "Account already exists. Please use a different email or sign in.",
    otpSendFailed: "OTP sending failed. Try again.",
  },
  updateEmail: {
    generalFallback: "Please correct the errors above.",
  },
};
