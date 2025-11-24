export type CheckIdentifierResponse = {
  success: boolean;
  message?: string;
  error?: { message?: string };
};

export type CheckIdentifierRequest = { identifier: string };
