import { UserModel } from "@/models/User";

export interface GraphQLContext {
  models: {
    User: UserModel;
  };
}

export interface UpdateSignupEmailArgs {
  oldEmail: string;
  newEmail: string;
}

export declare global {
  // Extend NodeJS global type
  var tempOtps: { [email: string]: string } | undefined;
}
