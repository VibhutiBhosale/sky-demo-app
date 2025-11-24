export interface UpdateSignupEmailArgs {
  oldEmail: string;
  newEmail: string;
}

export declare global {
  var tempOtps: { [email: string]: string } | undefined;
}

export interface NavItem {
  key: string;
  url?: string;
  submenu?: string[];
  position: "left" | "right";
}
