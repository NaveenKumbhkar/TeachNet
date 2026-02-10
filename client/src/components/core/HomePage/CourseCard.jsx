import React from "react";
import { HiUser  } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({courseData , currentCard , setCurrentCard}) =>{
    return(
        <div className={`${currentCard === courseData?.heading 
        ? "bg-white shadow-[12px_12px] shadow-yellow-50 text-richblack-900" 
        : "bg-richblack-800"} w-[360px] h-[300px] lg:w-[30%] box-border flex flex-col`}
        onClick={() => {setCurrentCard(courseData?.heading)}}>
            <div className="flex flex-col gap-3 border-b-[2px] border-richblack-400 border-dashed p-6 h-[80%]">
                <h1 className="text-xl font-semibold">{courseData?.heading}</h1>
                <p className="text-[16px] text-richblack-300">{courseData?.description}</p>
            </div>
            <div className={`${currentCard === courseData?.heading ? 
            "text-blue-300" : "text-richblack-300"
            } flex flex-row justify-between px-6 py-3 font-medium`}>
                <div className="flex flex-row gap-3 items-center">
                    <HiUser/>
                    {courseData?.level}
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <ImTree/>
                    {courseData?.lessionNumber} Lession
                </div>
            </div>
        </div>
    )
}

export default CourseCard;