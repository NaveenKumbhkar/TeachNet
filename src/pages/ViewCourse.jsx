import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { FaList } from "react-icons/fa";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse, getCompletedSubSectionsArray } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)
  const [ sidebar , setSidebar ] = useState(true);

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      const result = await getCompletedSubSectionsArray(courseId, token)
      // console.log("Result----->",result.data.completedVideo);
      // console.log("Course Data here... ", courseData.courseDetails)
      // console.log("Course content = ",courseData.courseDetails.courseContent);
      // console.log("Course Details = ", courseData.courseDetails);
      // console.log("Couser complation = ",courseData.completedVideos);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(result.data.completedVideo ? result.data.completedVideo : [] ))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} sidebar={sidebar} setSidebar={setSidebar} />
        <div className="h-[calc(100vh-3.5rem)] w-full flex flex-col gap-4 overflow-auto">
          <div className="relative lg:hidden w-full h-[50px] p-4">
            <button onClick={(() => setSidebar((prev) => !prev))} className="absolute right-0 mr-4">
              <FaList size={24} className="text-white"/>
            </button>
          </div>
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}