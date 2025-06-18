import React from "react";
import framImage from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignUpForm from "./SignUpForm"
const Template = ({title,description,description2,image,formType}) => {
    return(
        <div className="text-richblack-5 min-h-[100vh] flex items-center justify-center ">
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                <div className="w-11/12 mx-auto max-w-[450px] flex flex-col gap-2 md:mx-0">
                    <h1 className="text-4xl font-semibold">{title}</h1>
                    <p className="flex flex-col text-[1.125rem]">
                       <span className="text-richblack-100">{description}</span>
                       <span className="text-blue-100 italic font-edu-sa font-bold">{description2}</span>
                    </p>
                    {
                        formType === "login" ?
                        (<LoginForm/>) :
                        (<SignUpForm/>)
                    }
                </div>
                <div className="relative max-w-[450px] mx-auto md:mx-0">
                    <img src={framImage} alt="Pattern" width={500} height={500} loading="lazy" className="" />
                    <img src={image} alt="Student" width={500} height={500} loading="lazy" className="absolute -top-4 right-4" />
                </div>
            </div>
        </div>
    )
}

export default Template;