
import toast from "react-hot-toast";
import { profileEndpoints } from "../apis"
import { apiConnector } from "../apiConnector";

const {
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API,
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

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try{
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, 
    {
      Authorization: `Bearer ${token}`,
    })

    console.log("GET_INSTRUCTOR_API_RESPONSE", response);
    result = response?.data?.courses

  }
  catch(error) {
    console.log("GET_INSTRUCTOR_API ERROR", error);
    toast.error("Could not Get Instructor Data")
  }
  toast.dismiss(toastId);
  return result;
}