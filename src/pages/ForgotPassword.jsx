import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI"


const ForgotPassword = () => {
    const [emailSend , setEmailSend] = useState(false);
    const [email , setEmail] = useState("");
    const {loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSend));
    }
    return(
        <div className="min-h-[calc(100vh-3.5rem)] flex justify-center items-center px-4">
            {
                loading ? (<div className="spinner"></div>)
                : (
                    <div className="max-w-[450px] flex flex-col gap-5">
                        <h1 className="text-3xl text-richblack-5 font-semibold">
                            {emailSend ? "Check email" : "Reset your email"}
                        </h1>
                        <p className="text-richblack-100">
                            {
                                emailSend ? `We have sent the reset email to ${email}`
                                : "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            }
                        </p>
                        <form onSubmit={handleOnSubmit}>
                            {
                                !emailSend && (
                                <label className="w-full">
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </p>
                                <input 
                                type="email" 
                                name="email"  
                                required
                                value={email}
                                placeholder="Enter email address"
                                onChange={(event) => setEmail(event.target.value)}
                                className="w-full bg-richblack-800 rounded-lg text-richblack-5 p-[12px] pr-12 border-b border-richblack-400"
                                />
                            </label>
                                )
                            }
                            <button type="submit"
                            className="w-full py-2 rounded-lg bg-yellow-50 mt-5"
                            >
                                {
                                    emailSend ? "Reset Email" : "Submit"
                                }
                            </button>
                        </form>
                        <div className="flex justify-between items-center">
                            <Link to="/login">
                                <p className="flex items-center gap-x-2 text-richblack-5">
                                    <BiArrowBack/> Back to Login
                                </p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;
