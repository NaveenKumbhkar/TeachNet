
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighLightText from "../components/core/HomePage/HighLightText";
import CTAButton from "../components/core/HomePage/Button";
import videoLink from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/Comman/Footer";
import ReviewSlider from "../components/Comman/ReviewSlider";

const Home = () => {
    return (
        <div>
            {/* section one */}
            <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center gap-8 text-white">
                <Link to={"/signup"}>
                    <div className="flex gap-2 items-center mt-16 rounded-full bg-richblack-800 px-4 py-2 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
                        <p>Become an Instructor</p>
                        <FaArrowRight className="text-[12px]" />
                    </div>
                </Link>
                <div className="text-4xl text-center font-semibold">
                    Empower Your Future With
                    <HighLightText text={"Coding Skills"} />
                </div>
                <div className="w-[80%] text-lg text-richblack-300 font-bold text-center">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>
                <div className="flex gap-7">
                    <CTAButton active={true} toLink={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} toLink={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                <div className="mx-3 my-6 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
                    <video
                        className="shadow-[18px_18px_rgba(255,255,255)]"
                        muted loop autoPlay src={videoLink} type="video/mp4">
                    </video>
                </div>
                <div>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your <HighLightText text={"Coding Potential"} /> with our online courses
                            </div>
                        }
                        subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        buttonOne={
                            {
                                active: true,
                                toLink: "/signup",
                                buttonText: "Try it Yourself"
                            }
                        }
                        buttonTwo={
                            {
                                active: false,
                                toLink: "/login",
                                buttonText: "Learn More"
                            }
                        }
                        codeColor={"text-yellow-25"}
                        codeBlock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        bgGradient={<div className="codeblock1 absolute"></div>}
                    >

                    </CodeBlocks>
                </div>

                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold w-[100%] lg:w-[50%]">
                                Start <HighLightText text={"coding in seconds"} />
                            </div>
                        }
                        subHeading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        buttonOne={
                            {
                                active: true,
                                toLink: "/signup",
                                buttonText: "Continue Lesson"
                            }
                        }
                        buttonTwo={
                            {
                                active: false,
                                toLink: "/login",
                                buttonText: "Learn More"
                            }
                        }
                        codeColor={"text-white"}
                        codeBlock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                        bgGradient={<div className="codeblock2 absolute"></div>}
                    >

                    </CodeBlocks>

                    <ExploreMore/>
                </div>
            </div>

            {/* section two */}

            <div className="bg-pure-greys-5 text-richblue-700">
                <div className="homePageBG h-[310px]">
                    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col justify-between items-center gap-8">
                        <div className="lg:h-[200px]"></div>
                        <div className="flex gap-7 text-white">
                            <CTAButton active={true} toLink={"/singup"}>
                                <div className="flex gap-3 items-center">
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} toLink={"/login"}>
                                Learn More
                            </CTAButton>

                        </div>
                    </div>
                </div>

                <div className="w-11/12 mx-auto max-w-maxContent font-inter flex flex-col items-center justify-between gap-8">
                    <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
                        <div className="lg:w-[45%] text-4xl font-semibold">
                            Get the skills you need for a
                            <HighLightText text={"job that is in demand."} />
                        </div>
                        <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                            <div className="text-[16px]">
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <CTAButton active={true} toLink={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>

                    <TimeLineSection/>
                    <LearningLanguageSection/>
                </div>
            </div>

            {/* section three */}

            <div className="w-11/12 flex flex-col justify-center items-center my-20 mx-auto max-w-maxContent gap-8 bg-richblack-900 text-white mt-28">
                <InstructorSection/>
                <h2 className="text-center text-4xl font-semibold mt-8">
                    Review from other laerners
                </h2>
                <ReviewSlider/>
            </div>

            {/* footer */}
            <Footer/>
        </div>
    )
}

export default Home