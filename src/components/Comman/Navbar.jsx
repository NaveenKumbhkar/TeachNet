import React from "react";
import logo from "../../assets/Logo/logo.png";
import navbarLinks from "../../data/navbar-links";
import { useLocation , matchPath , Link } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
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
                <div>
                    <ul className="flex gap-5 text-[16px]">
                        {
                            navbarLinks.map((link, index) => {
                                return (
                                    <li key={index} >
                                        {
                                            link.title === "catalog"
                                            ? (
                                                <div></div>
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
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Navbar;