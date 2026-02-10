import React from "react";
import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "../HomePage/HighLightText.jsx";
import { HiUser } from "react-icons/hi";
import CourseCard from "./CourseCard.jsx";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabsName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };
    return(
        <div className="relative flex flex-col gap-5">
            <div className="text-4xl font-semibold text-center">
                Unlock the
                <HighLightText text={"Power of Code"}/>
            </div>
            <p className="text-[16px] text-richblack-300 text-center mb-5">
                Learn to Build Anything You Can Imagine
            </p>
            <div className="hidden lg:flex bg-richblack-800 px-1 py-1 rounded-full gap-5 -mt-5 mx-auto w-max text-richblue-200 font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
                {
                    tabsName.map((ele,i) => {
                        return(
                            <div key={i} 
                            className={`${currentTab === ele ? "bg-richblack-900 text-richblack-5" 
                            : "bg-richblack-800 text-richblack-200"} text-[16px] px-7 py-[7px] hover:text-richblack-5
                            hover:bg-richblack-900 transition-all duration-200 rounded-full cursor-pointer`}
                            onClick={() => setMyCard(ele)}
                            >
                                {ele}
                            </div>
                        )
                    })
                }
            </div>
            <div className="hidden lg:block lg:h-[200px]"></div>
            <div className="lg:absolute lg:px-0 mb-7 px-3 lg:bottom-[0] lg:translate-y-[50%] flex flex-row flex-wrap gap-10 justify-center lg:gap-0 lg:justify-between w-full">
                {
                    courses.map((course,i) => {
                        return(
                            <CourseCard
                            key={i}
                            courseData = {course}
                            currentCard = {currentCard}
                            setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMore;