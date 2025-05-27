import React, { useEffect } from "react";
import logo from "../../assets/Logo/logo.png";
import navbarLinks from "../../data/navbar-links";
import { useLocation , matchPath , Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const Navbar = () => {
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector ((state) => state.profile);
    const {totalItems} = useSelector ((state) => state.cart);
    const [subLinks,setSubLinks] = useState([]);
    const location = useLocation();

    const feachSubLinks = async() => {
        try{
            const result = await apiConnector("get", categories.CATEGORIES_API);
            console.log("result data is : ",result.data.data);
            setSubLinks(result.data.data);
        }
        catch(error)
        {
            console.log("Error occure while fatching subLinks data....");
            console.log(error);
        }
    }

    useEffect(() => {
        feachSubLinks();
    } , []);

    const matchRoute = (route) => {
        if(!route) return false;
        return matchPath({path:route} , location.pathname);
    }
    return (
        <div className="bg-richblack-900 border-b border-richblack-700">
            <div className="w-11/12 mx-auto flex justify-between py-3 px-10 items-center">
                <div>
                    <Link to="/">
                        <img src={logo} width={150} height={50} loading="lazy" />
                    </Link>
                </div>
                <nav>
                    <ul className="flex gap-5 text-[16px]">
                        {
                            navbarLinks.map((link, index) => {
                                return (
                                    <li key={index} >
                                        {
                                            link.title === "Catalog"
                                            ? (
                                                <div className="relative flex gap-1 items-center text-richblack-5 cursor-pointer group">
                                                    <p>Catalog</p>
                                                    <BsChevronDown className="mt-[2px]"/>
                                                    <div className="absolute invisible z-[1000] w-[200px] h-[200px] bg-richblack-500 top-8 -left-32 
                                                    group-hover:visible rounded-md p-2">
                                                        <div className="absolute invisible bg-richblack-500 -z-10 w-5 h-5 rounded-md rotate-45
                                                        -top-2 right-5 group-hover:visible"></div>
                                                            {
                                                            subLinks.map((link , index) => (
                                                                <Link to={`/${link}`} key={index}>
                                                                    <p className="text-lg">{link.name}</p>
                                                                </Link>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )
                                            : (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-300" : "text-richblack-5"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
                <div>
                    {
                        user && user?.accountType == "Student" && (
                            <Link to="/dashboard/cart">
                                <AiOutlineShoppingCart/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="text-richblack-50 mr-4 border border-richblack-700 px-4 py-2 rounded-lg bg-richblack-800">
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="text-richblack-50 border border-richblack-700 px-4 py-2 rounded-lg bg-richblack-800">
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;