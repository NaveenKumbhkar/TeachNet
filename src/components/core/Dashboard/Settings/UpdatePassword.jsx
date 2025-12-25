import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { changePassword } from "../../../../services/operations/settingsAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../Comman/IconBtn";


const UpdatePassword = () => {

    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);

    const { token } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors , isSubmitSuccessful }
    } = useForm();

    const submitPasswordForm = async (data) => {
        try {
            dispatch(changePassword(token, data));
        }
        catch (error) {
            console.log("Error message = ", error.message);
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful)
        {
            reset({
            oldPassword:"",
            newPassword:"",
        })
        }
    },[reset,isSubmitSuccessful]);


    return (
        <div>
            <form onSubmit={handleSubmit(submitPasswordForm)}>
                <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-4 md:px-12">
                    <h1 className="text-lg text-richblack-5 font-semibold">
                        Password
                    </h1>
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="oldPasswrod" className="text-[14px] text-richblack-5">
                                Current Password
                            </label>
                            <input type={showOldPass ? "text" : "password"}
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Enter current password"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("oldPassword", { required: true })}
                            />
                            <span
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                onClick={() => setShowOldPass(prev => !prev)}
                            >
                                {showOldPass ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            {
                                errors.oldPassword && (
                                    <span className="text-[12px] -mt-1 text-yellow-100">
                                        Please enter your current password
                                    </span>
                                )
                            }
                        </div>
                        <div className="relative flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="newPassword" className="text-[14px] text-richblack-5">
                                New Password
                            </label>
                            <input type={showNewPass ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                placeholder="Enter new password"
                                className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                                {...register("newPassword", { required: true })}
                            />
                            <span
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                onClick={() => setShowNewPass(prev => !prev)}
                            >
                                {showNewPass ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                            {
                                errors.newPassword && (
                                    <span className="text-[12px] -mt-1 text-yellow-100">
                                        Please enter your current password
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <button onClick={() => navigate("/dashboard/my-profile")}
                        className="bg-richblack-700 py-2 px-5 rounded-md text-richblack-50 cursor-pointer">
                        Cancel
                    </button>
                    <IconBtn text="Updata" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default UpdatePassword;