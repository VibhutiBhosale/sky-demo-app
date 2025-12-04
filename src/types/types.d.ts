export interface UpdateSignupEmailArgs {
  oldEmail: string;
  newEmail: string;
}

export declare global {
  var tempOtps: { [email: string]: string } | undefined;
}

export interface SubmenuItem {
  label: string;
  url: string;
}

export interface NavItem {
  key: string;
  url: string;
  position: "left" | "right";
  submenu?: SubmenuItem[];
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
