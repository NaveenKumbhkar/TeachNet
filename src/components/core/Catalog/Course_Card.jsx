import React, { useEffect, useState } from 'react'
import RatingStars from '../../Comman/RatingStars'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';
import { fetchCourseDetails } from "../../../services/operations/courseDetailsAPI"

const Course_Card = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [response, setResponse] = useState(null);
    //console.log("Course inside Course_Card = ",course);
    const courseId = course?._id;
    //console.log("Course Id inside Course_Card = ",course?._id);

    // useEffect(() => {
    //     // if (course?.ratingAndReview) {
    //     //     console.log("ratingAndReview inside Course_card = ",course.ratingAndReview);
    //     //     const count = GetAvgRating(course.ratingAndReview);
    //     //     console.log("count = ",count);
    //     //     setAvgReviewCount(count);
    //     // }
    //     async () => {
    //           try {
    //             const res = await fetchCourseDetails(courseId)
    //             setResponse(res)
    //           } catch (error) {
    //             console.log("Could not fetch Course Details")
    //           }
    //         }
    // }, [courseId]);


    useEffect(() => {
  async function getDetails() {
    try {
      const res = await fetchCourseDetails(courseId)
      setResponse(res)
    } catch (error) {
      console.log("Could not fetch Course Details")
    }
  }

  if (courseId) getDetails()
}, [courseId])


      useEffect(() => {
        //console.log("courseDetails =", response);
        //console.log("ratingAndReview =",response?.data?.courseDetails?.ratingAndReview);
    
        const count = GetAvgRating(response?.data?.courseDetails?.ratingAndReview)
        //console.log("count = ",count);
        setAvgReviewCount(count)
      }, [response])

    if (!course) return null;

    return (
        <Link to={`/courses/${course._id}`}>
            <div className="">
                <div className="rounded-lg">
                    <img
                        src={course?.thumbnail || "/default-thumbnail.jpg"}
                        alt="course thumbnail"
                        className={`${Height} w-full rounded-xl object-cover `}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName || "Untitled Course"}</p>
                    <p className="text-sm text-richblack-50">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-5">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-richblack-400">
                            {course?.ratingAndReview?.length || 0} Ratings
                        </span>
                    </div>
                    <p className="text-xl text-richblack-5">Rs. {course?.price || 0}</p>
                </div>
            </div>
        </Link>
    );
};

export default Course_Card;
