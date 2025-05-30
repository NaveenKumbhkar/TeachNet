import React from "react";
import HighLightText from "./HighLightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({ heading, subHeading, position, buttonOne, buttonTwo , codeBlock , codeColor , bgGradient }) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10`}>
            <div className="w-[100%] lg:w-[50%] flex flex-col gap-8">
                <div>
                    {heading}
                </div>
                <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subHeading}
                </div>
                <div className="flex gap-7 mt-7">
                    <CTAButton active={buttonOne.active} toLink={buttonOne.toLink}>
                        <div className="flex gap-2 items-center">
                            {buttonOne.buttonText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={buttonTwo.active} toLink={buttonTwo.toLink}>
                        {buttonTwo.buttonText}
                    </CTAButton>
                </div>
            </div>
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {bgGradient}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation
                      sequence={[codeBlock , 1000 , ""]}
                      cursor={true}
                      repeat={Infinity}
                      omitDeletionAnimation={true}
                      style={{
                        whiteSpace:"pre-line",
                        display:"block"
                      }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks