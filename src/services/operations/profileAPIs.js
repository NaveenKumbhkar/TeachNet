
import toast from "react-hot-toast";
import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";

const {
    GET_USER_ENROLLED_COURSES_API,
} = profileEndpoints;

export const getUserEnrolledCourses = async(token) => {
    const toastId = toast.loading("Loading...");
    let enrollCourseData = [];
    try{
        const response = await apiConnector("GET" , GET_USER_ENROLLED_COURSES_API, null ,
            {Authorization:`Bearer ${token}`}
        );

        console.log("Get user enrolled courses API = ",response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        enrollCourseData = response.data.data;
    }
    catch(error){
        console.log(error.response.data.message);
    }
    toast.dismiss(toastId);
    return enrollCourseData;
}