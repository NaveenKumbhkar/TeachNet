// import React from "react";
// import Instructor from "../../../assets/Images/Instructor.png";
// import HighLightText from "./HighLightText";
// import { FaArrowRight } from "react-icons/fa";
// import CTAButton from "./Button";

// const InstructorSection = () => {
//     return(
//         <div className="flex flex-col lg:flex-row gap-20 items-center">
//             <div className="lg:w-[50%]">
//                 <img src={Instructor} alt="" className="shadow-white shadow-[-20px_-20px_0px_0px] rounded-md" />
//             </div>
//             <div className="lg:w-[50%] flex flex-col items-start justify-center gap-10">
//                 <div className="text-4xl font-semibold lg:w-[50%]">
//                     Become an 
//                     <HighLightText text={"Instructor"}/>
//                 </div>
//                 <div className="w-[90%] text-justify text-[16px] text-richblack-300 font-medium">
//                     Instructors from around the world teach millions of students on StudyNotion. 
//                     We provide the tools and skills to teach what you love.
//                 </div>
//                 <div>
//                     <CTAButton active={true} toLink={"/signup"}>
//                         <div className="flex gap-3 items-center">
//                             Start Teaching Today
//                             <FaArrowRight/>
//                         </div>
//                     </CTAButton>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default InstructorSection;


import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighLightText from "./HighLightText";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./Button";

const InstructorSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent mx-auto py-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

      {/* IMAGE */}
      <div className="lg:w-1/2 flex justify-center">
        <img
          src={Instructor}
          alt="Instructor"
          className="rounded-lg shadow-[20px_20px_0px_0px_rgba(255,255,255,0.15)] 
          hover:scale-105 transition-all duration-300 w-full max-w-[450px]"
        />
      </div>

      {/* TEXT SECTION */}
      <div className="lg:w-1/2 flex flex-col gap-6 items-start">

        <h2 className="text-3xl md:text-4xl font-semibold leading-snug">
          Become an{" "}
          <HighLightText text={"Instructor"} />
        </h2>

        <p className="text-richblack-300 text-base md:text-lg leading-relaxed max-w-[500px]">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills you need to teach what
          you love and build your teaching career.
        </p>

        <div className="pt-2">
          <CTAButton active={true} toLink={"/signup"}>
            <div className="flex items-center gap-3 font-semibold">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>

      </div>
    </div>
  );
};

export default InstructorSection;