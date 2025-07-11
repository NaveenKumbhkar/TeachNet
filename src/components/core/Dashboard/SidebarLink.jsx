import { useSelector } from "react-redux";
import { useLocation, matchPath, NavLink } from "react-router-dom";
import * as Icons from "react-icons/vsc";


const SidebarLink = ({ link, iconName }) => {
    const location = useLocation();
    const Loading = useSelector(state => state.profile);
    const Icon = Icons[iconName];

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink
            to={link.path}
            //onClick={}
            className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50"
                    : "bg-opacity-0 text-richblack-300"} 
          transition-all duration-200`}>
            <span
                className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                    }`}
            ></span>
            <div className="flex items-center gap-x-2">
                {Icon ? (
                    <Icon className="text-lg" />
                ) : (
                    <span className="text-lg text-red-500">Icon not found</span>
                )}
                <span>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLink;