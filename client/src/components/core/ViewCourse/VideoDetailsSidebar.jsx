// import { useEffect, useState } from "react"
// import { BsChevronDown } from "react-icons/bs"
// import { IoIosArrowBack } from "react-icons/io"
// import { useSelector } from "react-redux"
// import { useLocation, useNavigate, useParams } from "react-router-dom"
// import { RxCrossCircled } from "react-icons/rx";
// import { AnimatePresence, motion } from "framer-motion";

// import IconBtn from "../../Comman/IconBtn"

// export default function VideoDetailsSidebar({ setReviewModal, sidebar, setSidebar }) {
//   const [activeStatus, setActiveStatus] = useState("")
//   const [videoBarActive, setVideoBarActive] = useState("")
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { sectionId, subSectionId } = useParams()
//   const {
//     courseSectionData,
//     courseEntireData,
//     totalNoOfLectures,
//     completedLectures,
//   } = useSelector((state) => state.viewCourse)

//   useEffect(() => {
//     ; (() => {
//       if (!courseSectionData.length) return
//       const currentSectionIndx = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//       )
//       const currentSubSectionIndx = courseSectionData?.[
//         currentSectionIndx
//       ]?.subSection.findIndex((data) => data._id === subSectionId)
//       const activeSubSectionId =
//         courseSectionData[currentSectionIndx]?.subSection?.[
//           currentSubSectionIndx
//         ]?._id
//       setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
//       setVideoBarActive(activeSubSectionId)
//     })()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [courseSectionData, courseEntireData, location.pathname])
//   //console.log("completedLectures = ",completedLectures);

//   return (
//     <>
//       {/* ================= MOBILE VIEW ================= */}
//       <AnimatePresence>

//       <motion.div
//         initial={{ y: "100%", opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: "100%", opacity: 0 }}
//         transition={{ duration: 0.8 }}
//         className="fixed z-50 lg:hidden h-[calc(100vh-3.5rem)] w-[calc(100vw-2.5rem)] mt-20 mx-5 flex-col border-r-[1px] rounded-t-lg border-r-richblack-700 bg-richblack-800">

//         <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">

//           <div className="flex w-full items-center justify-between ">
//             <div
//               onClick={() => {
//                 navigate(`/dashboard/enrolled-courses`)
//               }}
//               className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
//               title="back"
//             >
//               <IoIosArrowBack size={30} />
//             </div>
//             <button onClick={(() => setSidebar((prev) => !prev))} className="">
//               <RxCrossCircled size={30} className="text-white" />
//             </button>
//           </div>
//           <button
//               className="w-full rounded-lg bg-richblack-200 text-richblack-900 py-2"
//               onClick={() => setReviewModal(true)}>
//                 Add Review
//           </button>
//           <div className="flex flex-col">
//             <p>{courseEntireData?.courseName}</p>
//             <p className="text-sm font-semibold text-richblack-500">
//               {completedLectures?.length} / {totalNoOfLectures}
//             </p>
//           </div>
//         </div>

//         <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
//           {courseSectionData.map((course, index) => (
//             <div
//               className="mt-2 cursor-pointer text-sm text-richblack-5"
//               onClick={() => setActiveStatus(course?._id)}
//               key={index}
//             >
//               {/* Section */}
//               <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
//                 <div className="w-[70%] font-semibold">
//                   {course?.sectionName}
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {/* <span className="text-[12px] font-medium">
//                     Lession {course?.subSection.length}
//                   </span> */}
//                   <span
//                     className={`${activeStatus === course?.sectionName
//                         ? "rotate-0"
//                         : "rotate-180"
//                       } transition-all duration-500`}
//                   >
//                     <BsChevronDown />
//                   </span>
//                 </div>
//               </div>

//               {/* Sub Sections */}
//               {activeStatus === course?._id && (
//                 <div onClick={(() => setSidebar((prev) => !prev))} className="transition-[height] duration-500 ease-in-out">
//                   {course.subSection.map((topic, i) => (
//                     <div
//                       className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
//                           ? "bg-yellow-200 font-semibold text-richblack-800"
//                           : "hover:bg-richblack-900"
//                         } `}
//                       key={i}
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//                         )
//                         setVideoBarActive(topic._id)
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={completedLectures.includes(topic?._id)}
//                         onChange={() => { }}
//                       />
//                       {topic.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </motion.div>

//       </AnimatePresence>




//       {/* ================= DESKTOP VIEW ================= */}
//       <div className="hidden lg:flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
//           <div className="flex w-full items-center justify-between ">
//             <div
//               onClick={() => {
//                 navigate(`/dashboard/enrolled-courses`)
//               }}
//               className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
//               title="back"
//             >
//               <IoIosArrowBack size={30} />
//             </div>
//             <button
//               className="w-[150px] rounded-lg bg-richblack-200 text-richblack-900 py-1"
//               onClick={() => setReviewModal(true)}>
//                 Add Review
//           </button>

//           </div>
//           <div className="flex flex-col">
//             <p>{courseEntireData?.courseName}</p>
//             <p className="text-sm font-semibold text-richblack-500">
//               {completedLectures?.length} / {totalNoOfLectures}
//             </p>
//           </div>
//         </div>

//         <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
//           {courseSectionData.map((course, index) => (
//             <div
//               className="mt-2 cursor-pointer text-sm text-richblack-5"
//               onClick={() => setActiveStatus(course?._id)}
//               key={index}
//             >
//               {/* Section */}
//               <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
//                 <div className="w-[70%] font-semibold">
//                   {course?.sectionName}
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {/* <span className="text-[12px] font-medium">
//                     Lession {course?.subSection.length}
//                   </span> */}
//                   <span
//                     className={`${activeStatus === course?.sectionName
//                         ? "rotate-0"
//                         : "rotate-180"
//                       } transition-all duration-500`}
//                   >
//                     <BsChevronDown />
//                   </span>
//                 </div>
//               </div>

//               {/* Sub Sections */}
//               {activeStatus === course?._id && (
//                 <div className="transition-[height] duration-500 ease-in-out">
//                   {course.subSection.map((topic, i) => (
//                     <div
//                       className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
//                           ? "bg-yellow-200 font-semibold text-richblack-800"
//                           : "hover:bg-richblack-900"
//                         } `}
//                       key={i}
//                       onClick={() => {
//                         navigate(
//                           `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
//                         )
//                         setVideoBarActive(topic._id)
//                       }}
//                     >
//                       <input
//                         type="checkbox"
//                         checked={completedLectures.includes(topic?._id)}
//                         onChange={() => { }}
//                       />
//                       {topic.title}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   )
// }



import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { HiArrowCircleUp } from "react-icons/hi";
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { RxCrossCircled } from "react-icons/rx"
import { AnimatePresence, motion } from "framer-motion"

import IconBtn from "../../Comman/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {

  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const [collapsed, setCollapsed] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return

      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)

      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)

    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}

      <AnimatePresence>
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: collapsed ? "62vh" : "0vh" }}
          exit={{ y: "100%" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 18
          }}
          className="fixed bottom-0 z-50 lg:hidden w-full h-[80vh] rounded-t-3xl border-t border-richblack-700 bg-richblack-800"
        >

          {/* HEADER */}
          <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-4 text-richblack-25">

            <div className="flex justify-between items-center">

              <div
                onClick={() => navigate(`/dashboard/enrolled-courses`)}
                className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 text-richblack-700"
              >
                <IoIosArrowBack size={22} />
              </div>

              {/* 🔥 TOGGLE BUTTON */}
              <button onClick={() => setCollapsed((prev) => !prev)}>
                {collapsed ? (
                  <HiArrowCircleUp size={30} className="text-richblack-25" />
                ) : (
                  <RxCrossCircled size={30} className="text-white" />
                )}
              </button>

            </div>

            {/* ALWAYS VISIBLE */}
            <div>
              <p className="font-semibold">{courseEntireData?.courseName}</p>
              <p className="text-sm text-richblack-400">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>

            {/* HIDE WHEN COLLAPSED */}
            {!collapsed && (
              <button
                className="w-full rounded-lg bg-richblack-200 text-richblack-900 py-2"
                onClick={() => setReviewModal(true)}
              >
                Add Review
              </button>
            )}
          </div>

          {/* CONTENT (HIDE WHEN COLLAPSED) */}
          {!collapsed && (
            <div className="h-[60vh] overflow-y-auto">

              {courseSectionData.map((course, index) => (

                <div
                  className="mt-2 cursor-pointer text-sm text-richblack-5"
                  onClick={() => setActiveStatus(course?._id)}
                  key={index}
                >

                  {/* SECTION */}
                  <div className="flex justify-between bg-richblack-600 px-5 py-4">
                    <div className="w-[70%] font-semibold">
                      {course?.sectionName}
                    </div>

                    <span
                      className={`${activeStatus === course?._id
                        ? "rotate-0"
                        : "rotate-180"
                        } transition-all duration-500`}
                    >
                      <BsChevronDown />
                    </span>
                  </div>

                  {/* SUB SECTION */}
                  {activeStatus === course?._id && (
                    <div>

                      {course.subSection.map((topic, i) => (

                        <div
                          key={i}
                          className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id
                            ? "bg-yellow-200 text-richblack-800 font-semibold"
                            : "hover:bg-richblack-900"
                            }`}
                          onClick={() => {
                            navigate(
                              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                            )
                            setVideoBarActive(topic._id)
                            setCollapsed((prev) => !prev)
                          }}
                        >

                          <input
                            type="checkbox"
                            checked={completedLectures.includes(topic?._id)}
                            readOnly
                          />

                          {topic.title}

                        </div>

                      ))}

                    </div>
                  )}

                </div>

              ))}

            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* ================= DESKTOP VIEW ================= */}

      <div className="hidden fixed lg:flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            <button
              className="w-[150px] rounded-lg bg-richblack-200 text-richblack-900 py-1"
              onClick={() => setReviewModal(true)}>
              Add Review
            </button>

          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-[12px] font-medium">
                     Lession {course?.subSection.length}
                   </span> */}
                  <span
                    className={`${activeStatus === course?.sectionName
                      ? "rotate-0"
                      : "rotate-180"
                      } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${videoBarActive === topic._id
                        ? "bg-yellow-200 font-semibold text-richblack-800"
                        : "hover:bg-richblack-900"
                        } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={() => { }}
                      />
                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}