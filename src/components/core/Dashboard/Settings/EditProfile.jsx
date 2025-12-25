import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../Comman/IconBtn";
import { updateProfile } from "../../../../services/operations/settingsAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];


const EditProfile = () => {
    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = (data) => {
        try{
            dispatch(updateProfile(token,data));
        }
        catch(error){
            console.log("Error message = ",error.message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-4 md:px-12">
                    <h1 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h1>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="text-[14px] text-richblack-5">
                                First Name
                            </label>
                            <input type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your name"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {
                                errors.firstName && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter your first name
                                    </span>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="text-[14px] text-richblack-5">
                                Last Name
                            </label>
                            <input type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter last Name"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {
                                errors.lastName && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Pleas enter last name
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="text-[14px] text-richblack-5">
                                Date of birth
                            </label>
                            <input type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your date of birth"
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of birth can not be change in the future"
                                    }
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {
                                errors.dateOfBirth && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        {errors.dateOfBirth.message}
                                    </span>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="text-[14px] text-richblack-5">
                                Gender
                            </label>
                            <select
                                type="text"
                                name="gender"
                                id="gender"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })}
                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your Date of Birth.
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 lg:flex-row">
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="text-[14px] text-richblack-5">
                                Contact Number
                            </label>
                            <input type="number"
                                id="contactNumber"
                                name="contactNumber"
                                placeholder="Enter your contact number"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("contactNumber", {
                                    required:{
                                        value:true,
                                        message:"Please enter your contact number"
                                    },
                                    maxLength:{value:12 , message:"Invalid contact number"},
                                    minLength:{value:10, message:"Invalid contact number"}
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {
                                errors.contactNumber && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        {errors.contactNumber.message}
                                    </span>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="about" className="text-[14px] text-richblack-5">
                                About
                            </label>
                            <input type="text"
                                id="about"
                                name="about"
                                placeholder="Enter Bio details"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("about", { required: true })}
                                defaultValue={user?.additionalDetails?.about}
                            />
                            {
                                errors.about && (
                                    <span className="-mt-1 text-[12px] text-yellow-100">
                                        Please enter about you
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button
                      className="text-richblack-50 bg-richblack-700 py-2 px-5 rounded-md font-semibold"
                      onClick={() => { navigate("/dashboard/my-profile") }}
                      type="button">
                        Cancel
                    </button>
                    <IconBtn text="save" type="submit"/>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;