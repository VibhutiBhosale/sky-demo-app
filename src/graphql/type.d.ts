interface GraphQLContext {
  userId?: string;
  res?: {
    setHeader: (key: string, value: string | string[]) => void;
  };
}

interface SignupArgs {
  name?: string;
  email: string;
  password: string;
}

interface LoginArgs {
  email: string;
  password: string;
}

interface VerifyPasswordArgs {
  identifier: string;
  password: string;
}

interface JwtPayload {
  userId: string;
  email: string;
}