import React from "react";
import HighLightText from "../components/core/HomePage/HighLightText";
import BannerImgOne from "../assets/Images/aboutus1.webp";
import BannerImgTwo from "../assets/Images/aboutus2.webp";
import BannerImgThree from "../assets/Images/aboutus3.webp";
import ourFoundingImg from "../assets/Images/foundingStory.png";
import StatusComponent from "../components/core/AboutPage/StatusComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import Footer from "../components/Comman/Footer";

const About = () => {
    return (
        <div>
            {/* Section 1 */}
            <section className="bg-richblack-700">
                <div className="relative w-11/12 mx-auto max-w-maxContent flex flex-col justify-between text-center gap-10 text-white">
                    <div className="mx-auto py-20 lg:w-[70%]">
                        <header className="text-4xl font-semibold">
                            Driving Innovation in Online Education for a
                            <HighLightText text={"Brighter Future"} />
                        </header>
                        <p className="text-base font-medium text-richblack-300 mt-3 lg:w-[95%]">
                            TeachNet is at the forefront of driving innovation in online
                            education. We're passionate about creating a brighter future by
                            offering cutting-edge courses, leveraging emerging technologies,
                            and nurturing a vibrant learning community.
                        </p>
                    </div>
                    <div className="sm:h-[70px] lg:h-[150px]"></div>
                    <div className="absolute w-full bottom-0 left-[50%] translate-x-[-50%] translate-y-[30%] grid grid-cols-3 gap-3 lg:gap-5">
                        <img src={BannerImgOne} alt="" />
                        <img src={BannerImgTwo} alt="" />
                        <img src={BannerImgThree} alt="" />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="border-b border-richblack-700">
                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-10 justify-between">
                    <div className="h-[100px]"></div>
                    <div className="mx-auto text-xl md:text-4xl text-white font-semibold text-center py-5 pb-20 ">
                    We are passionate about revolutionizing the way we learn. Our
                    innovative platform
                    <HighLightText text={"combines technology"}/>
                    <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
                       {" "}
                       expertise
                    </span>
                    , and community to create an
                    <span className="bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text font-bold">
                       {" "}
                    unparalleled educational
                    experience.
                    </span> 
                </div>
                </div>
            </section>

            {/* Section 3 */}
            <section>
                <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-10 text-richblack-500">
                    <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                        <div className="flex flex-col gap-10 lg:w-[50%] my-24">
                            <h1 className="text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent lg:w-[70%]">
                                Our Founding Story
                            </h1>
                            <p className="text-richblack-300 font-medium text-base lg:w-[95%]">
                                Our e-learning platform was born out of a shared vision and passion for 
                                transforming education. It all began with a group of educators, technologists, 
                                and lifelong learners who recognized the need for accessible, flexible, and 
                                high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className="text-richblack-300 font-medium text-base lg:w-[95%]">
                                As experienced educators ourselves, we witnessed firsthand the limitations 
                                and challenges of traditional education systems. We believed that education 
                                should not be confined to the walls of a classroom or restricted by 
                                geographical boundaries. We envisioned a platform that could bridge these 
                                gaps and empower individuals from all walks of life to unlock their full 
                                potential.
                            </p>
                        </div>
                        <div>
                            <img src={ourFoundingImg} alt="" 
                            className="shadow-[0_0_20px_0] shadow-[#FC6767]"/>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-10 justify-between items-center">
                        <div className="flex flex-col my-24 gap-10 lg:w-[40%]">
                            <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-transparent lg:w-[70%]">
                                Our Vision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w[95%]">
                                With this vision in mind, we set out on a journey to create an e-learning platform 
                                that would revolutionize the way people learn. Our team of dedicated experts 
                                worked tirelessly to develop a robust and intuitive platform that combines 
                                cutting-edge technology with engaging content, fostering a dynamic and interactive 
                                learning experience.
                            </p>
                        </div>
                        <div className="flex flex-col my-24 gap-10 lg:w-[40%]">
                            <h1 className="text-4xl font-semibold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent lg:w-[70%]">
                                Our Mision
                            </h1>
                            <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                                Our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                                community of learners, where individuals can connect, collaborate, and learn from 
                                one another. We believe that knowledge thrives in an environment of sharing and dialogue, 
                                and we foster this spirit of collaboration through forums, live sessions, and networking 
                                opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <StatusComponent/>
            <section className="bg-richblack-900 w-11/12 max-w-maxContent mx-auto mt-20 text-white flex flex-col justify-between gap-10">
                <LearningGrid/>
                <ContactFormSection/>
            </section>


            <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between py-20 gap-8 bg-richblack-900 text-white">
                <h1 className="text-4xl font-semibold text-richblack-5 mt-8">
                    Reviews from other learners
                </h1>
                {/* Review slider */}
            </div>

            <Footer/>
        </div>
    )
}

export default About;