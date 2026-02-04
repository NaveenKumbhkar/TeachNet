import { setLoading, setToken } from "../../slices/authSlice";
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authApis } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const { SENDOTP_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
    SIGNUP_API,
    LOGIN_API,
} = authApis;


export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loding....");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, { email, checkUserPresent: true, });

            console.log("SendOtp api response = ", response);
            //console.log(response.data.success);

            if (!response.data.success) {
                toast.error(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("Send otp successfully...");
            navigate("/verify-email");
        }
        catch (error) {
            //console.log("sendotp api error = ", error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const getPasswordResetToken = (email, setEmailSend) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });

            //console.log("Reset password token response = ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Email send successfully");
            setEmailSend(true);
        }
        catch (error) {
            //console.log("Reset password token error = ", error);
            toast.error("Faild to send email for resetting email");
        }
        dispatch(setLoading(false));
    }
}


export const resetPassword = (password, confirmPassword, token, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            if (password !== confirmPassword) {
                toast.error("Both passwords are different");
            }
            else {
                const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });

                console.log("Reset api response = ", response);

                if (!response.data.success) {
                    throw new Error(response.data.message);
                }

                toast.success("Password has been reset successfully");
                navigate("/login");
            }
        }
        catch (error) {
            console.log("Reset password error = ", error);
            toast.error("Unable to reset password");
        }
        dispatch(setLoading(false));
    }
}

export const signup = (accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {

            const response = await apiConnector("POST", SIGNUP_API, { accountType, firstName, lastName, email, password, confirmPassword, otp, });

            //console.log("signup response = ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup successfully");
            navigate("/login");
        }
        catch (error) {
            //console.log("data send to API is = ",firstName," ", lastName," ", email," ", password," ", confirmPassword," ", otp);
            //console.log("Failed to signup...");
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export const login = (email, password, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

           // console.log("LOGIN API RESPONSE = ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login successfully");

            //console.log("before token set token = ",response.data.token);
            dispatch(setToken(response.data.token));

            //console.log("before userImage generating");
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            
            //console.log("before user setting" , response.data.user);
            dispatch(setUser({ ...response.data.user, image: userImage }));

            //console.log("before token setting to local storage");
            localStorage.setItem("token", JSON.stringify(response.data.token));

            //console.log("before user setting to local storage");
            localStorage.setItem("user", JSON.stringify(response.data.user));

            //console.log("before to navigate dashboard");
            navigate("/dashboard/my-profile");
        }
        catch (error) {
            console.error("login failed..." , error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/");
    }
}
