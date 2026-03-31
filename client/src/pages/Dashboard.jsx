// import { useSelector } from "react-redux";
// import Sidebar from "../components/core/Dashboard/Sidebar";
// import SidebarForM from "../components/core/Dashboard/SidebarForM"
// import { Outlet } from "react-router-dom";


// const Dashboard = () => {
//     const { loading: authLoading } = useSelector(state => state.auth);
//     const { loading: profileLoading } = useSelector(state => state.profile);

//     if (authLoading || profileLoading) {
//         return (
//             <div className="grid min-h-[clac(100vh-3.5rem)] place-items-center">
//                 <div className="spinner"></div>
//             </div>
//         )
//     }
//     return (
//         <>
//             <div className="static lg:hidden bottom-0">
//                 <SidebarForM />
//             </div>
//             <div className="relative flex overflow-y-hidden">


//                 <div className="hidden lg:flex">
//                     <Sidebar />
//                 </div>
//                 <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
//                     <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//                         <Outlet />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Dashboard;



import { useSelector } from "react-redux";
import Sidebar from "../components/core/Dashboard/Sidebar";
import SidebarForM from "../components/core/Dashboard/SidebarForM";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  // Loader
  if (authLoading || profileLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] mt-14 bg-richblack-900 text-white">

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 overflow-y-auto fixed bottom-5 w-full px-5 z-50 lg:hidden">
        <SidebarForM />
       </motion.div>

      {/* Desktop Sidebar */}
      <div className="hidden fixed h-full z-50 lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 lg:ml-48 overflow-y-auto"
      >
        <div className="mx-auto w-11/12 max-w-[1100px] py-10">

          {/* Page Content */}
          <Outlet />

        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;