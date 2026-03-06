import React, { useEffect, useState } from 'react'
import Footer from '../components/Comman/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className="box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 pt-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div className="py-8 border-b mb-8 border-b-richblack-600">
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className="mx-auto box-content w-full max-w-maxContentTab px-4 pt-8 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8 border-b mb-8 border-b-richblack-600">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-8 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog




// import React, { useEffect, useState } from "react";
// import Footer from "../components/Comman/Footer";
// import { useParams } from "react-router-dom";
// import { apiConnector } from "../services/apiConnector";
// import { categories } from "../services/apis";
// import { getCatalogaPageData } from "../services/operations/pageAndComponentData";
// import Course_Card from "../components/core/Catalog/Course_Card";
// import CourseSlider from "../components/core/Catalog/CourseSlider";
// import { useSelector } from "react-redux";
// import Error from "./Error";
// import { motion } from "framer-motion";

// const Catalog = () => {

//   const { loading } = useSelector((state) => state.profile);
//   const { catalogName } = useParams();

//   const [active, setActive] = useState(1);
//   const [catalogPageData, setCatalogPageData] = useState(null);
//   const [categoryId, setCategoryId] = useState("");

//   // Fetch Categories
//   useEffect(() => {
//     const getCategories = async () => {
//       const res = await apiConnector("GET", categories.CATEGORIES_API);

//       const category_id =
//         res?.data?.data?.filter(
//           (ct) =>
//             ct.name.split(" ").join("-").toLowerCase() === catalogName
//         )[0]?._id;

//       setCategoryId(category_id);
//     };

//     getCategories();
//   }, [catalogName]);

//   // Fetch Category Details
//   useEffect(() => {
//     const getCategoryDetails = async () => {
//       try {
//         const res = await getCatalogaPageData(categoryId);
//         setCatalogPageData(res);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     if (categoryId) getCategoryDetails();
//   }, [categoryId]);

//   // Loader
//   if (loading || !catalogPageData) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (!loading && !catalogPageData.success) {
//     return <Error />;
//   }

//   return (
//     <>
//       {/* HERO SECTION */}
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 px-6 py-16"
//       >
//         <div className="mx-auto max-w-maxContent">
//           <p className="text-sm text-richblack-300">
//             Home / Catalog /
//             <span className="text-yellow-50 ml-1">
//               {catalogPageData?.data?.selectedCategory?.name}
//             </span>
//           </p>

//           <h1 className="text-4xl font-bold text-richblack-5 mt-4">
//             {catalogPageData?.data?.selectedCategory?.name}
//           </h1>

//           <p className="max-w-[750px] text-richblack-200 mt-4 text-lg">
//             {catalogPageData?.data?.selectedCategory?.description}
//           </p>
//         </div>
//       </motion.div>

//       {/* SECTION 1 */}
//       <div className="mx-auto w-full  px-6 py-12">

//         <h2 className="text-2xl font-semibold text-richblack-5">
//           Courses to get you started
//         </h2>

//         {/* Tabs */}
//         <div className="flex gap-6 border-b border-richblack-700 mt-6">

//           <button
//             onClick={() => setActive(1)}
//             className={`pb-3 transition-all duration-300 ${
//               active === 1
//                 ? "text-yellow-50 border-b-2 border-yellow-50"
//                 : "text-richblack-200 hover:text-yellow-50"
//             }`}
//           >
//             Most Popular
//           </button>

//           <button
//             onClick={() => setActive(2)}
//             className={`pb-3 transition-all duration-300 ${
//               active === 2
//                 ? "text-yellow-50 border-b-2 border-yellow-50"
//                 : "text-richblack-200 hover:text-yellow-50"
//             }`}
//           >
//             New
//           </button>

//         </div>

//         {/* Slider */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           className="py-10 border-b border-richblack-700"
//         >
//           <CourseSlider
//             Courses={catalogPageData?.data?.selectedCategory?.courses}
//           />
//         </motion.div>
//       </div>

//       {/* SECTION 2 */}
//       <div className="mx-auto max-w-maxContent px-6 py-12">

//         <h2 className="text-2xl font-semibold text-richblack-5">
//           Top courses in {catalogPageData?.data?.differentCategory?.name}
//         </h2>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="py-10 border-b border-richblack-700"
//         >
//           <CourseSlider
//             Courses={catalogPageData?.data?.differentCategory?.courses}
//           />
//         </motion.div>
//       </div>

//       {/* SECTION 3 */}
//       <div className="mx-auto max-w-maxContent px-6 py-12">

//         <h2 className="text-2xl font-semibold text-richblack-5">
//           Frequently Bought
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">

//           {catalogPageData?.data?.mostSellingCourses
//             ?.slice(0, 4)
//             .map((course, i) => (

//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.4, delay: i * 0.1 }}
//                 whileHover={{ scale: 1.04 }}
//               >
//                 <Course_Card
//                   course={course}
//                   Height={"h-[400px]"}
//                 />
//               </motion.div>

//           ))}

//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Catalog;




