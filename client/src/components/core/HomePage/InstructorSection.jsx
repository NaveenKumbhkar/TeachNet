import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";

const InstructorSection = () => {
    return(
        <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-[50%]">
                <img src={Instructor} alt="" className="shadow-white shadow-[-20px_-20px_0px_0px]" />
            </div>
            <div className="lg:w-[50%] flex flex-col items-start justify-center gap-10">
                <div className="text-4xl font-semibold lg:w-[50%]">
                    Become an 
                    <HighLightText text={"Instructor"}/>
                </div>
                <div className="w-[90%] text-justify text-[16px] text-richblack-300 font-medium">
                    Instructors from around the world teach millions of students on StudyNotion. 
                    We provide the tools and skills to teach what you love.
                </div>
                <div>
                    <CTAButton active={true} toLink={"/signup"}>
                        <div className="flex gap-3 items-center">
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;