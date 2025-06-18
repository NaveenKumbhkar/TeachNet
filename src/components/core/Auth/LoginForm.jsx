
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI"


const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData;

    function handlerOnChange(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        dispatch(login(email, password, navigate));
    }
    return (
        <form onSubmit={handleOnSubmit} className="w-full flex flex-col mt-6 gap-y-4">
            <label htmlFor="">
                <p>Email Address <span className="text-pink-200">*</span></p>
                <input
                    type="email"
                    name="email"
                    value={email}
                    required
                    onChange={handlerOnChange}
                    placeholder="Enter email address"
                    className="w-full p-[12px] pr-12 text-richblack-5 bg-richblack-700 rounded-md border-b border-richblack-400"
                />
            </label>

            <label htmlFor="" className="relative">
                <p>Password <span className="text-pink-200">*</span></p>
                <input
                    type={showPassword === true ? "text" : "password"}
                    name="password"
                    value={password}
                    required
                    onChange={handlerOnChange}
                    placeholder="Enter password"
                    className="w-full p-[12px] pr-12 text-richblack-5 bg-richblack-700 rounded-md border-b border-richblack-400"
                />
                <span onClick={(() => setShowPassword((prev) => !prev))} className="absolute right-4 top-9">
                    {
                        showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                    }
                </span>
                <Link to="/forgot-password" className="absolute -bottom-6 right-0">
                    <p className="text-[12px] text-blue-100">Forgot Password</p>
                </Link>
            </label>

            <button type="submit" className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Login
            </button>
        </form>
    )
}

export default LoginForm;