const Profile = require("../models/Profile");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploaded");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const mongoose = require("mongoose");

//update profile
exports.updateProfile = async(req,res) => {
    try{
        //feach data
        const {
            dateOfBirth="",
            about="",
            contactNumber="",
            gender="",
            firstName="",
            lastName="",
        } = req.body;
        //feach userId
        const id = req.user.id;

        //find profile
        const userDetails = await User.findById(id);
        const profileId = await userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        const user = await User.findByIdAndUpdate(
            id,
            {
                firstName,
                lastName,
            }
        );
        
        await user.save();

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();

        //find the updated user details
        const updatedUserDetails = await User.findById(id)
            .populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            updatedUserDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while updating profile",
            error:error.message,
        })
    }
}

//delete account
//how can we schedule this deletion operation
//what is cron job
exports.deleteAccount = async(req,res) => {
    try{
        //get user id
        const id = req.user.id;
        const userDetails = await User.findById(id);

        //validation
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        //delete profile
        await Profile.findByIdAndDelete({
            _id:new mongoose.Types.ObjectId(userDetails.additionalDetails)
        });

        //HW unenroll student from eroll sturdent list
        for(const courseId of userDetails.courses){
            await Course.findOneAndUpdate(
                courseId,
                { $pull: { studentsEnrolled:id } },
                { new:true }
            )
        }
        //delete account
        await User.findByIdAndDelete({_id:id});
        await CourseProgress.deleteMany({userID: id});
        //return response
        return res.status(200).json({
            success:true,
            message:"Account deleted successfully",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"someting went wrong while deleting account",
            error:error.message,
        })
    }
}

//get all user details
exports.getAllUserDetails = async(req,res) => {
    try{
        //feach the data
    const id = req.user.id;
    //validate and get user data
    const userDetails = await User.findById(id).populate("additionalDetails").exec();
    //return response
    return res.status(200).json({
        success:true,
        message:"User data feached successfully",
        data:userDetails,
    })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"someting went wrong while feaching the data of user",
            error:error.message,
        })
    }
}



//update display picture
exports.updateDisplayPicture = async(req,res) => {
    try{
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const updatedProfile = await User.findOneAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        );

        res.send({
            success:true,
            message:`Image updated successfully`,
            data:updatedProfile
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//Get enrolled courses 
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}


//Instructor deshboard
exports.instructorDashboard = async(req,res) => {
    try{
        const instructorId = req.user.id;

        const courseDetails = await Course.find({Instructor:instructorId});

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            //create a new object with the additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                cosurseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }

            return courseDataWithStats;
        })

        return res.status(200).json({
            success:true,
            courses: courseData,
        })
    }
    catch(error){
        console.log("Error while see instructor deshboard = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}