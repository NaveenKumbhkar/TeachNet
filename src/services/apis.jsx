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

export const contactUsApi = {
    CONTACT_US_API : BASE_URL + "/reach/contact",
}

// Settings section APIs
export const settingsEndpoints = {
  UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// Profile endpoints
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}