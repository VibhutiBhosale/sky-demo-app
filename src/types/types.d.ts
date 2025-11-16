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
