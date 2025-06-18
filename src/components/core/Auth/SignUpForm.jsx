import { useState } from "react";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../Comman/Tab";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";

const SignUpForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const handlerOnChange = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name] : event.target.value
        }))
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }

        const signupData = {
            ...formData,
            accountType
        }
       
        console.log("signup data = " , signupData);

        dispatch(setSignupData(signupData));

        dispatch(sendOtp(formData.email, navigate));

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }

    // data to tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]


    return (
        <div>
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            <form onSubmit={handleOnSubmit} className="w-full flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <label htmlFor="">
                        <p className="text-[0.875rem] mb-1 text-richblack-5">
                            First Name
                            <span className="text-pink-200">*</span>
                        </p>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            required
                            onChange={handlerOnChange}
                            placeholder="Enter first name"
                            className="w-full bg-richblack-700 p-[12px] rounded-lg border-b border-richblack-400"
                        />
                    </label>
                    <label htmlFor="">
                        <p className="text-[0.875rem] mb-1 text-richblack-5">
                            Last Name
                            <span className="text-pink-200">*</span>
                        </p>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            required
                            onChange={handlerOnChange}
                            placeholder="Enter last name"
                            className="w-full bg-richblack-700 p-[12px] rounded-lg border-b border-richblack-400"
                        />
                    </label>
                </div>
                <label htmlFor="">
                    <p className="text-[0.875rem] mb-1 text-richblack-5">
                        Email address
                        <span className="text-pink-200">*</span>
                    </p>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        required
                        onChange={handlerOnChange}
                        placeholder="Enter email"
                        className="w-full bg-richblack-700 p-[12px] pr-12 rounded-lg border-b border-richblack-400"
                    />
                </label>
                <div className="flex flex-row gap-4 justify-between">
                    <label htmlFor="" className="relative">
                        <p className="text-[0.875rem] mb-1 text-richblack-5">
                            Create password
                            <span className="text-pink-200">*</span>
                        </p>
                        <input
                            type={showPassword === true ? "text" : "password"}
                            name="password"
                            value={password}
                            required
                            onChange={handlerOnChange}
                            placeholder="Enter password"
                            className="w-full bg-richblack-700 p-[12px] rounded-lg border-b border-richblack-400"
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className="absolute top-9 right-2">
                            {
                                showPassword ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                            }
                        </span>
                    </label>
                    <label htmlFor="" className="relative">
                        <p className="text-[0.875rem] mb-1 text-richblack-5">
                            Confirm password
                            <span className="text-pink-200">*</span>
                        </p>
                        <input
                            type={showConfirmPass === true ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            required
                            onChange={handlerOnChange}
                            placeholder="Confirm password"
                            className="w-full bg-richblack-700 p-[12px] rounded-lg border-b border-richblack-400"
                        />
                        <span onClick={() => setShowConfirmPass((prev) => !prev)} className="absolute top-9 right-2">
                            {
                                showConfirmPass ? (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) : (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />)
                            }
                        </span>
                    </label>
                </div>
                <button type="submit" className="w-ful mt-4 items-center bg-yellow-200 rounded-lg py-2 text-richblack-900">
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignUpForm;