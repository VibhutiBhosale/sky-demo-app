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

export type ProductDataProps = {
  cardHeading: string;
  productHeading: string;
  productDesciption: string;
  productImageWidth600: string;
  productImageWidth900: string;
  primaryButton: string;
  secondaryButton: string;
};
