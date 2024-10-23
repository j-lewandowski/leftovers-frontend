export const DEFAULT_ENDPOINTS = {
  AUTH: '/auth/',
  RECIPES: '/recipes/',
  USERS: '/users/',
  UPLOAD_FILE: '/upload-file/',
};

export const API = {
  AUTH: {
    LOGIN: `${DEFAULT_ENDPOINTS.AUTH}login/`,
    REGISTER: `${DEFAULT_ENDPOINTS.AUTH}register/`,
    CONFIRM_SIGNUP: `${DEFAULT_ENDPOINTS.AUTH}confirm/`,
    FORGOT_PASSWORD: `${DEFAULT_ENDPOINTS.AUTH}forgot-password/`,
    RESET_PASSWORD: `${DEFAULT_ENDPOINTS.AUTH}reset-password/`,
  },
  RECIPES: {
    ALL: `${DEFAULT_ENDPOINTS.RECIPES}`,
    CREATE: `${DEFAULT_ENDPOINTS.RECIPES}`,
    RECIPE_OF_THE_DAY: `${DEFAULT_ENDPOINTS.RECIPES}recipe-of-the-day/`,
  },
  USERS: {
    SAVE_RECIPES: `${DEFAULT_ENDPOINTS.USERS}save-recipes/`,
  },
};
