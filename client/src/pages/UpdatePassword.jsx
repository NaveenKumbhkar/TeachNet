import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation , Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";


const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector(state => state.auth);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [formData, setFormData] = useState({ newPass: "", confirmPass: "" });

    const { newPass, confirmPass } = formData;

    const handleOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(newPass, confirmPass, token, navigate));
    }
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] justify-center items-center">
            {
                loading ? (<div className="spinner"></div>)
                    : (
                        <div className="max-w-[500px] p-4 lg:p-8">
                            <h1 className="text-3xl text-richblack-50 font-semibold mb-3">
                                Choose new Password
                            </h1>
                            <p className="text-richblack-5 mb-4">
                                Almost done. Enter your new password and youre all set.
                            </p>
                            <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
                                <label className="relative">
                                    <p className="text-[12px] text-richblack-5 mb-1">
                                        New password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        type={showNewPass ? "text" : "password"}
                                        name="newPass"
                                        value={newPass}
                                        required
                                        placeholder="Enter new password"
                                        onChange={handleOnChange}
                                        className="w-full bg-richblack-800 rounded-lg p-[12px] pr-12 border-b border-richblack-400 text-richblack-5"
                                    />
                                    <span onClick={() => setShowNewPass((prev) => !prev)}
                                        className="absolute top-9 right-3"
                                    >
                                        {
                                            showNewPass ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                                : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                        }
                                    </span>
                                </label>
                                <label className="relative">
                                    <p className="text-[12px] text-richblack-5 mb-1">
                                        Confirm password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        type={showConfirmPass ? "text" : "password"}
                                        name="confirmPass"
                                        value={confirmPass}
                                        required
                                        placeholder="Enter new password"
                                        onChange={handleOnChange}
                                        className="w-full bg-richblack-800 rounded-lg p-[12px] pr-12 border-b border-richblack-400 text-richblack-5"
                                    />
                                    <span onClick={() => setShowConfirmPass(prev => !prev)}
                                        className="absolute top-9 right-3"
                                    >
                                        {
                                            showConfirmPass ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                                                : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                                        }
                                    </span>
                                </label>
                                <div className="flex flex-wrap gap-x-4 text-caribbeangreen-400">
                                    <div className="flex gap-2 items-center">
                                        <FaCheckCircle /> Uppercase (A-Z) letters
                                    </div><div className="flex gap-2 items-center">
                                        <FaCheckCircle /> Lowercase (a-z) letters
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaCheckCircle /> Special characters (!@#$%^&*)
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <FaCheckCircle /> Numbers (0-9)
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                                >
                                    Reset Password
                                </button>
                            </form>
                            <div className="mt-6 flex items-center justify-between">
                                <Link to="/login">
                                    <p className="flex items-center gap-x-2 text-richblack-5">
                                        <BiArrowBack /> Back To Login
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default UpdatePassword;
