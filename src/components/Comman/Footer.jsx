import React from "react";
import Logo from "../../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaYoutube, FaGoogle } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";

const resources = ["Articles", "Blog", "Chart Sheet", "Code Challenges", "Docs", "Projects", "Videos", "Workspaces"];
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];

const Footer = () => {
    return (
        <div className="bg-richblack-800">
            <div className="flex flex-col gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
                <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
                    <div className="flex flex-wrap flex-row gap-3 lg:w-[50%] justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5">
                        <div className="w-[30%] pb-7 flex flex-col gap-5 lg:pl-0">
                            <img src={Logo} alt="" />
                            <h1 className="text-richblack-50 font-semibold text-[16px]">Company</h1>
                            <div className="flex flex-col gap-3 text-sm text-richblack-400">
                                {
                                    ["About", "Careers", "Affiliates"].map((ele, i) => {
                                        return (
                                            <div key={i} className="hover:text-richblack-50 transition-all duration-200">
                                                <Link to={ele.toLowerCase()}>{ele}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="flex gap-3 text-richblack-400 text-lg">
                                <FaFacebook />
                                <FaGoogle />
                                <FaTwitter />
                                <FaYoutube />
                            </div>
                        </div>
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <h1 className="text-richblack-50 font-semibold text-[16px]">Resources</h1>
                            <div className="flex flex-col gap-3 text-richblack-400 text-sm mt-2">
                                {
                                    resources.map((ele, i) => {
                                        return (
                                            <div key={i} className="hover:text-richblack-50 transition-all duration-200">
                                                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">Support</h1>
                            <div className="text-sm mt-2 text-richblack-400 hover:text-richblack-50 transition-all duration-200">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>
                        </div>
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            <h1 className="text-richblack-50 font-semibold text-[16px]">Plan</h1>
                            <div className="flex flex-col gap-3 mt-2 text-sm text-richblack-400">
                                {
                                    ["Paid memberships", "For students", "Business solutions"].map((ele, i) => {
                                        return (
                                            <div key={i} className="hover:text-richblack-50 transition-all duration-200">
                                                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-3">Community</h1>
                            <div className="flex flex-col gap-3 mt-2 text-sm text-richblack-400">
                                {
                                    ["Forums", "Chapters", "Events"].map((ele, i) => {
                                        return (
                                            <div key={i} className="hover:text-richblack-50 transition-all duration-200">
                                                <Link to={ele.split(" ").join("-").toLowerCase()}>{ele}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
                        {FooterLink2.map((ele, i) => {
                            return (
                                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                                    <h1 className="text-richblack-50 font-semibold text-[16px]">
                                        {ele.title}
                                    </h1>
                                    <div className="flex flex-col gap-3 mt-2 text-richblack-400">
                                        {ele.links.map((link, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                >
                                                    <Link to={link.link}>{link.title}</Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full mx-auto text-sm">
                    <div className="flex flex-row">
                        {
                            BottomFooter.map((ele,i) => {
                                return(
                                    <div key={i} className={`${BottomFooter.length - 1 === i ? "" : "border-r border-richblack-700"} cursor-pointer px-3 hover:text-richblack-50 transition-all duration-200`}>{ele}</div>
                                )
                            })
                        }
                    </div>
                    <div className="text-center">
                        Made By ❤️ Naveen Kumbhkar © 2025 TeachNet
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;