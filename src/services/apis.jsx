const BASE_URL = "http://localhost:4000/api/v1";

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories",
};

// auth apis
export const authApis = {
    SENDOTP_API : BASE_URL + "/auth/sendOTP",
    RESETPASSTOKEN_API : BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API : BASE_URL + "/auth/reset-password",
    SIGNUP_API : BASE_URL + "/auth/signup",
    LOGIN_API : BASE_URL + "/auth/login",
}