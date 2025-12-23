const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection");
const Course = require("../models/Course.js");

exports.updateCourseProgress = async(req,res) => {
    try{
        const { courseId,subsectionId } = req.body;
        const userId = req.user.id;

        const subSection = await SubSection.findById({_id:subsectionId});

        //console.log("subSection info inside ucp controller = ",subSection);
        // console.log("userId inside ucp = ",userId);
        // console.log("courseId inside ucp = ",courseId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"sub section is not found",
            });
        }

        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId,
        });

        //console.log("courseProgress info inside ucp controller = ", courseProgress);

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
               userID:userId,
               courseID:courseId,
               completedVideo: [],
            });
        }

        if(courseProgress.completedVideo.includes(subsectionId)){
            return res.status(400).json({
                success:false,
                message:"sub section is already exist",
            });
        }

        courseProgress.completedVideo.push(subsectionId);

        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"course progress updated successfully",
        })
    }
    catch(error){
        console.log("Error while updating course progress = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



exports.getCompletedSubSectionsArray = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    // console.log("userId inside getCSA = ",userId);
    // console.log("courseId inside getCSA = ",courseId);
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Check course exist
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Find progress document
    const progress = await CourseProgress.findOne({
        courseID: courseId,
        userID: userId,
    });

    // If no progress yet → return empty
    if (!progress) {
      return res.status(200).json({
        success: true,
        completedVideo: [],
        completedCount: 0,
        message: "No completed subsections found",
      });
    }

    return res.status(200).json({
      success: true,
      completedVideo: progress.completedVideo,
      //completedCount: progress.completedVideo.length,
      message: "Completed subsections fetched successfully",
    });

  } catch (error) {
    console.error("ERROR in getCompletedSubSectionsArray →", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching completed subsections",
      error: error.message,
    });
  }
};



// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.user.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseID.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideo.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }