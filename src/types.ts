export type SignupFormInput = {
  email: string;
  password: string;
  acceptTC: boolean;
};

export type SigninFormInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ForgotPasswordFormInput = {
  email: string;
};
