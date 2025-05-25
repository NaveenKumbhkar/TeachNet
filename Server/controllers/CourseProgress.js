const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async(req,res) => {
    try{
        const { courseId,userId,subSectionId } = req.body;

        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"sub section is not found",
            });
        }

        const courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId,
        });

        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message:"Course progress is not found",
            });
        }

        if(courseProgress.completedVideo.includes(subSectionId)){
            return res.status(400).json({
                success:false,
                message:"sub section is already exist",
            });
        }

        courseProgress.completedVideo.push(subSectionId);

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
//       (courseProgress.completedVideos.length / lectures) * 100

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