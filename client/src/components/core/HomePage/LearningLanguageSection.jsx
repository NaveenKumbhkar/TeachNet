import React from "react";
import HighLightText from "./HighLightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.svg";
import compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.svg";
import CTAButton from "./Button";

const LearningLanguageSection = () =>{
    return(
        <div className="mt-[130px] mb-20">
            <div className="flex flex-col gap-5">
                <div className="text-4xl font-semibold text-center">
                    Your swiss knife for
                   <HighLightText text={"learning any language"} />
                </div>
                <div className="text-center font-medium mx-auto text-richblue-500 text-base lg:w-[75%]">
                    Using spin making learning multiple languages easy. with 20+
                    languages realistic voice-over, progress tracking, custom schedule
                    and more.
                </div>
                <div className="flex flex-col lg:flex-row justify-between mt-8 lg:mt-0">
                    <img src={know_your_progress} alt="" className="-mr-32 object-contain" />
                    <img src={compare_with_others} alt=""  className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>
                    <img src={plan_your_lesson} alt="" className="lg:-ml-36 lg:-mt-5 -mt-16 object-contain" />
                </div>
                <div className="flex justify-center">
                    <CTAButton active={true} toLink={"/signup"}>Learn More</CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection;