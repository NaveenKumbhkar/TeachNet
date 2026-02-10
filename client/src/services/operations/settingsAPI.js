
import toast from "react-hot-toast"
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
    UPDATE_PROFILE_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints;

export const updateProfilePicture = (token, formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            //console.log("token in updataProfilePicture operation =", token);
            //console.log("Header ki value = ",{"Content-Type":"multipart/form-data" , Authorization:`Bearer ${token}`})
            const response = await apiConnector("PUT", UPDATE_PROFILE_PICTURE_API, formData,
                { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` });

            //console.log("API response = ",response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile Picture updated successfully");
            dispatch(setUser(response.data.data));
        }
        catch (error) {
            console.log("Error while uploading Profile Picture = ", error);
            toast.error("Could not update profile picture");
        }
        toast.dismiss(toastId);
    }
}


export const updateProfile = (token, data) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, data,
                { Authorization: `Bearer ${token}` }
            )

            console.log("Updata profile API response = ", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            const userImage = response.data.updatedUserDetails.image
                ? response.data.updatedUserDetails.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            dispatch(
                setUser({ ...response.data.updatedUserDetails, image: userImage })
            )
            toast.success("Profile Updated Successfully")
        }
        catch (error) {
            console.log("Error while updating profile data = ", error);
            toast.error("Could not update profile");
        }
        toast.dismiss(toastId);
    }
}


export const changePassword = (token,formData) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("POST" , CHANGE_PASSWORD_API , formData ,
                {Authorization:`Bearer ${token}`}
            );

            console.log("change password API response = ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password change successfully");
        }
        catch(error){
            console.log("Change password API error = ",error);
            toast.error("Could not change password");
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}


export const deleteAccount = (token , navigate) => {
    const toastId = toast.loading("Loading...");
    return async(dispatch) => {
        try{
            const response = await apiConnector("DELETE" , DELETE_PROFILE_API , null , 
                {Authorization:`Bearer ${token}`}
            );

            console.log("delete profile API response = ",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Profile deleted successfully");
            dispatch(logout(navigate));
        }
        catch(error){
            console.log("Delete account API error = ",error);
            //toast.error("Could not delete Profile");
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}