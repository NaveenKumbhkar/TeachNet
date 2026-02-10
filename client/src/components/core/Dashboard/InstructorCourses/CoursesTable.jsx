import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"

import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../Comman/ConfirmationModal"

// export default function CoursesTable({ courses, setCourses }) {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { token } = useSelector((state) => state.auth)
//   const [loading, setLoading] = useState(false)
//   const [confirmationModal, setConfirmationModal] = useState(null)
//   const TRUNCATE_LENGTH = 30

//   const handleCourseDelete = async (courseId) => {
//     setLoading(true)
//     await deleteCourse({ courseId: courseId }, token)
//     const result = await fetchInstructorCourses(token)
//     if (result) {
//       setCourses(result)
//     }
//     setConfirmationModal(null)
//     setLoading(false)
//   }

//   // console.log("All Course ", courses)

//   return (
//     <>
//       <Table className="rounded-xl border border-richblack-800 ">
//         <Thead>
//           <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
//             <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
//               Courses
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Duration
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Price
//             </Th>
//             <Th className="text-left text-sm font-medium uppercase text-richblack-100">
//               Actions
//             </Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {courses?.length === 0 ? (
//             <Tr>
//               <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
//                 No courses found
//                 {/* TODO: Need to change this state */}
//               </Td>
//             </Tr>
//           ) : (
//             courses?.map((course) => (
//               <Tr
//                 key={course._id}
//                 className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
//               >
//                 <Td className="flex flex-col md:flex-row md:flex-1 gap-4">
//                   <img
//                     src={course?.thumbnail}
//                     alt={course?.courseName}
//                     className="h-[50px] md:h-[150px] w-[50px] md:w-[150px] rounded-lg object-cover"
//                   />
//                   <div className="flex flex-col justify-between">
//                     <p className="text-lg font-semibold text-richblack-5">
//                       {course.courseName}
//                     </p>
//                     <p className="text-xs text-richblack-300">
//                       {course.courseDescription.split(" ").length >
//                       TRUNCATE_LENGTH
//                         ? course.courseDescription
//                             .split(" ")
//                             .slice(0, TRUNCATE_LENGTH)
//                             .join(" ") + "..."
//                         : course.courseDescription}
//                     </p>
//                     <p className="text-[12px] text-white">
//                       Created: {formatDate(course.createdAt)}
//                     </p>
//                     {course.status === COURSE_STATUS.DRAFT ? (
//                       <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
//                         <HiClock size={14} />
//                         Drafted
//                       </p>
//                     ) : (
//                       <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
//                         <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
//                           <FaCheck size={8} />
//                         </div>
//                         Published
//                       </p>
//                     )}
//                   </div>
//                 </Td>
//                 <Td className="text-sm font-medium text-richblack-100">
//                   2hr 30min
//                 </Td>
//                 <Td className="text-sm font-medium text-richblack-100">
//                   ₹{course.price}
//                 </Td>
//                 <Td className="text-sm font-medium text-richblack-100 ">
//                   <button
//                     disabled={loading}
//                     onClick={() => {
//                       navigate(`/dashboard/edit-course/${course._id}`)
//                     }}
//                     title="Edit"
//                     className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
//                   >
//                     <FiEdit2 size={20} />
//                   </button>
//                   <button
//                     disabled={loading}
//                     onClick={() => {
//                       setConfirmationModal({
//                         text1: "Do you want to delete this course?",
//                         text2:
//                           "All the data related to this course will be deleted",
//                         btn1Text: !loading ? "Delete" : "Loading...  ",
//                         btn2Text: "Cancel",
//                         btn1Handler: !loading
//                           ? () => handleCourseDelete(course._id)
//                           : () => {},
//                         btn2Handler: !loading
//                           ? () => setConfirmationModal(null)
//                           : () => {},
//                       })
//                     }}
//                     title="Delete"
//                     className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
//                   >
//                     <RiDeleteBin6Line size={20} />
//                   </button>
//                 </Td>
//               </Tr>
//             ))
//           )}
//         </Tbody>
//       </Table>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </>
//   )
// }


export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) setCourses(result)
    setConfirmationModal(null)
    setLoading(false)
  }

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden flex flex-col gap-4">
        {courses?.length === 0 ? (
          <p className="text-center text-richblack-100">
            No courses found
          </p>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="border border-richblack-800 rounded-lg bg-richblack-900 p-4"
            >
              <div className="flex gap-4">
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-richblack-5">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300 line-clamp-2">
                    {course.courseDescription}
                  </p>
                  <p className="text-xs text-richblack-400">
                    Created: {formatDate(course.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-3 text-xs text-richblack-100">
                <span>⏱ 2hr 30min</span>
                <span>₹{course.price}</span>
              </div>

              <div className="flex justify-end gap-4 mt-3 text-caribbeangreen-600">
                <button
                  disabled={loading}
                  onClick={() =>
                    navigate(`/dashboard/edit-course/${course._id}`)
                  }
                >
                  <FiEdit2 size={18} />
                </button>
                <button
                  disabled={loading}
                  onClick={() =>
                    setConfirmationModal({
                      text1: "Delete this course?",
                      text2: "This action cannot be undone",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () =>
                        handleCourseDelete(course._id),
                      btn2Handler: () =>
                        setConfirmationModal(null),
                    })
                  }
                  className="text-[#ff0000]"
                >
                  <RiDeleteBin6Line size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block">
        <Table className="rounded-xl border border-richblack-800">
          <Thead>
            <Tr className="border-b border-richblack-800">
              <Th className="px-6 py-3 text-left text-sm text-richblack-100">
                Courses
              </Th>
              <Th className="px-6 py-3 text-left text-sm text-richblack-100">
                Duration
              </Th>
              <Th className="px-6 py-3 text-left text-sm text-richblack-100">
                Price
              </Th>
              <Th className="px-6 py-3 text-left text-sm text-richblack-100">
                Actions
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {courses.map((course) => (
              <Tr
                key={course._id}
                className="border-b border-richblack-800"
              >
                <Td className="px-6 py-4">
                  <div className="flex gap-4">
                    <img
                      src={course.thumbnail}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-richblack-5">
                        {course.courseName}
                      </p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription}
                      </p>
                      <p className="text-xs text-richblack-400">
                        Created: {formatDate(course.createdAt)}
                      </p>
                    </div>
                  </div>
                </Td>

                <Td className="px-6 py-4 text-sm text-richblack-100">
                  2hr 30min
                </Td>

                <Td className="px-6 py-4 text-sm text-richblack-100">
                  ₹{course.price}
                </Td>

                <Td className="px-6 py-4">
                  <div className="flex gap-4">
                    <FiEdit2
                      size={20}
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      
                      className="cursor-pointer text-caribbeangreen-500"
                    />
                    <RiDeleteBin6Line
                      size={20}
                      className="text-pi cursor-pointer text-[#ff0000]"
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this course?",
                          text2:
                            "All related data will be removed",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleCourseDelete(course._id),
                          btn2Handler: () =>
                            setConfirmationModal(null),
                        })
                      }
                    />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}

