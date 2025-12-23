import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../data/countrycode.json"
import { contactUsApi } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";

const { CONTACT_US_API } = contactUsApi;

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();


    const submitContactForm = async (data) => {
        try {
            setLoading(true);
            console.log("data befor calling api = ", data);
            const response = await apiConnector("POST", CONTACT_US_API, data)
            console.log("APi response = ", response.data);
        }
        catch (e) {
            console.log("Error while calling contact form API = ", e.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(
                {
                    firstName: "",
                    lastnName: "",
                    email: "",
                    phoneNo: "",
                    message: "",
                }
            )
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">
            <div className="flex flex-col lg:flex-row gap-5">
                <div className="flex flex-col gap-2 md:w-[48%]">
                    <label htmlFor="firstName" className="text-[14px] text-richblack-5">
                        First Name
                    </label>
                    <input type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Enter first name"
                        className="bg-richblack-700 rounded-lg p-3 text-richblack-5 placeholder:text-richblack-400 shadow-[0_1px_0_0] shadow-white/50 text-[16px] leading-[24px] focus:outline-none"
                        {...register("firstName", { required: true })}
                    />
                    {
                        errors.firstname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter you name
                            </span>
                        )
                    }
                </div>
                <div className="flex flex-col gap-2 md:w-[48%]">
                    <label htmlFor="lastName" className="text-[14px] text-richblack-5">
                        Last name
                    </label>
                    <input type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter last name"
                        className="bg-richblack-700 text-richblack-5 rounded-lg text-[16px] leading-[24px] p-3 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none"
                        {...register("lastName")}
                    />
                    {
                        errors.lastname && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please Enter last name
                            </span>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[14px] text-richblack-5">
                    Email address
                </label>
                <input type="email"
                    name="email"
                    id="email"
                    placeholder="Enter email address"
                    className="bg-richblack-700 text-richblack-5 rounded-lg p-3 text-[16px] shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none leading-[24px]"
                    {...register("email", { required: true })}
                />
                {
                    errors.email && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter email
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col">
                <label htmlFor="phonenumber" className="text-[14px] text-richblack-5">
                    Phone Number
                </label>
                <div className="flex flex-row gap-5">
                    <select name="" id="" type="text"
                        {...register("countryCode", { required: true })}
                        className="w-[81px] bg-richblack-700 text-richblack-5 placeholder:text-richblack-400 text-[16px] leading-[24px] p-3 rounded-lg shadow-[0_1px_0_0] shadow-white/50 focus:outline-none">
                        {
                            countrycode.map((element, index) => {
                                return (
                                    <option key={index} value={element.code}>
                                        {element.code} -{element.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <input type="number"
                        name="phonenumber"
                        id="phonenumber"
                        placeholder="01234 56789"
                        className="w-full bg-richblack-700 text-richblack-5 placeholder:text-richblack-400 text-[16px] leading-[24px] p-3 rounded-lg shadow-[0_1px_0_0] shadow-white/50 focus:outline-none"
                        {...register("phoneNo", {
                            required: {
                                value: true,
                                message: "Enter your phone number"
                            },
                            maxLength: { value: 12, message: "Invalid Phone number" },
                            minLength: { value: 10, message: "Invalid Phone number" },
                        })} />
                </div>
                {
                    errors.phoneNo && (
                        <span className="mt-1 text-[12px] text-yellow-100">
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[14px] text-richblack-5">
                    Message
                </label>
                <textarea
                    name="message"
                    id="message"
                    cols={30}
                    rows={7}
                    placeholder="Enter your message here"
                    className="bg-richblack-700 text-richblack-5 placeholder:text-richblack-400 text-[16px] leading-[24px] rounded-lg shadow-[0_1px_0_0] shadow-white/50 focus:outline-none p-3"
                    {...register("message", { required: true })}
                />
                {
                    errors.message && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your message here
                        </span>
                    )
                }
            </div>
            <button
                type="submit"
                disabled={loading}
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                    ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                    }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send message
            </button>
        </form>
    )
}

export default ContactUsForm;