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

export type ErrorResponse = {
  message: string | string[];
};

export type ResetPasswordFormInput = {
  newPassword: string;
  repeatNewPassword: string;
};

export type Recipe = {
  id: string;
  title: string;
  description: string;
  rating: number;
  numberOfRatings: number;
  preparationTime: string;
  ingredients: string[];
  preparationSteps: string[];
  visibility: string;
  createdAt: Date;
  authorId: string;
  category: string;
  servings: number;
  imageUrl: string;
};
