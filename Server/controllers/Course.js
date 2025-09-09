const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");
const { uploadImageToCloudinary } = require("../utils/imageUploaded");
const { convertSecondsToDuration } = require("../utils/secToDuration");


require("dotenv").config();

//create course
exports.createCourse = async (req, res) => {
    try {
        //get user id 
        const userId = req.user.id;

        //get all required data from request body
        let { 
            courseName, 
            courseDescription, 
            whatWillYouLearn, 
            price, 
            tag: _tag, 
            category, 
            status, 
            instructions: _instructions,
        } = req.body;

        //get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;

        //convert tag and instruction from stringified array to array
        //console.log("tag value is = ",typeof(_tag));
        const tag = Array.isArray(_tag) ?  JSON.parse(_tag) : _tag ;
        const instructions = Array.isArray(_instructions) ? JSON.parse(_instructions) : _instructions;

        // console.log("tag = ",tag);
        // console.log("instructions = ",instructions);

        // console.log("course Name = ",courseName);
        // console.log("courseDescription = ",courseDescription);
        // console.log("whatWillYouLearn = ",whatWillYouLearn);
        // console.log("price = ",price);
        // console.log("tag length = ",tag.length);
        // console.log("category = ",category);
        // console.log("instructions.length = ",instructions.length);

        //validation
        if (!courseName || 
            !courseDescription || 
            !whatWillYouLearn || 
            !price || 
            !tag.length || 
            !thumbnail || 
            !category || 
            !instructions.length
        ) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        if(!status || status === undefined){
            status = "Draft"
        }

        //check for instructor
        const instructorDetails = await User.findById(userId , {accountType:"Instructor"});
        //console.log("Instructor Detials = ", instructorDetails);

        if (!instructorDetails) {
            return res.status(401).json({
                success: false,
                message: "Instructor details not found"
            })
        }

        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category is not found"
            })
        }

        //upload thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new user
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            Instructor: instructorDetails._id,
            whatYouWillLearn: whatWillYouLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status:status,
            instructions,
        })

        //add to the new course to user schema of Instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true }
        )

        //Add the new course to the categories
        const categoryDetailsTwo = await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push:{
                    courses:newCourse._id,
                },
            },
            { new:true },
        )


        //return response
        return res.status(200).json({
            success: true,
            message: "created a new course successfully",
            newCourse,
        })
    }
    catch (error) {
        console.log("Error occured while creating a new course = ", error);
        return res.status(500).json({
            success: false,
            message: "something went wrong , while creating a new course"
        })
    }
}


//edit course details
exports.editCourse = async(req,res) => {
    try{
        const { courseId } = req.body;
        const updates = req.body;
        const course = await Course.findById(courseId);
        
        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course is not found",
            });
        }

        if(req.files){
            const thumbnail = req.files.thumbnailImage;
            const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        for(const key in updates){
            if(updates.hasOwnProperty(key)) {
                if(key === "tag" || key === "instructions"){
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        //course.instructor = req.user.id;
        await course.save();

        const updatedCourse = await Course.findOne({_id:courseId})
            .populate({
                path:"Instructor",
                populate:{
                    path:"additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            })
            .exec();

        //console.log("Update course inside edit course controller : ",updatedCourse);    
        return res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedCourse
        })
    }
    catch(error){
        console.log("Error while updating course = ",error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

//showAllCourses 
exports.showAllCourses = async (req, res) => {
    try {
        //TODO: change the below statements incremently
        const allCourses = await Course.find(
            { status:"Published" },
            {
                courseName:true,
                price:true,
                thumbnail:true,
                Instructor:true,
                ratingAndReview:true,
                studentsEnrolled:true,
            }
        )
        .populate("instructor")
        .exec();

        //return response
        return res.status(200).json({
            success: true,
            message: "Data for all courses feached successfully",
            allCourses,
        })
    }
    catch (error) {
        console.log("this error occure while feaching the data of all courses = ", error);
        return res.status(500).json({
            success: false,
            message: "some error occure while feaching data of all courses",
            error: error.message,
        })
    }
}

//get course details
exports.getCourseDetails = async (req, res) => {
    try {
        //get course id from request body
        const { courseId } = req.body;

        //find course details
        const courseDetails = await Course.find({ _id: courseId })
            .populate({ path: "Instructor", populate: { path: "additionalDetails" } })
            .populate("category")
            //.populate("ratingAndReview")
            .populate({ path: "courseContent", populate: { path: "subSection", } })
            .exec();

        //validation
        if (!courseDetails) {
            return res.status(403).json({
                success: false,
                message: "Course details is not found"
            })
        }

        //count total time durtion
        // let totalDurationInSeconds = 0 ;
        // courseDetails.courseContent.forEach((constent) => {
        //     constent.SubSection.forEach((subSection) => {
        //         const timeDurationInSeconds = parseInt(subSection.timeDuration);
        //         totalDurationInSeconds += timeDurationInSeconds
        //     })
        // })

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        //retrun response
        return res.status(200).json({
            success: true,
            message: "course details founded successfully",
            data:{
                courseDetails,
                //totalDuration,
            },
        })
    }
    catch (error) {
        console.log("Error occures while fatching the course details = ", error);
        return res.status(500).json({
            success: false,
            message: "Error occures while feachig the details of course",
        })
    }
}


exports.getFullCourseDetails = async(req,res) => {
    try{
        //get course id and user id from request body
        //console.log("Welcome inside course/getCourseDetails one");
        //const { courseId, id: userId } = req.query;
        const { courseId } = req.body;
        const userId = req.body.id;

        //console.log("Welcome inside course/getCourseDetails two = ",courseId);

        //find course details
        const courseDetails = await Course.findOne({_id:courseId})
           .populate({
            path:"Instructor",
            populate:{
                path:"additionalDetails",
            },
           })
           .populate("category")
           .populate("ratingAndReview")
           .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
           })
           .exec();

        //console.log("Welcome inside course/getCourseDetails three = ",courseDetails);   

        //find course progress
        let CourseProgressCount = await CourseProgress.findOne({
            courseID:courseId,
            userId:userId,
        })

        //console.log("Welcome inside course/getCourseDetails four");

        //console.log("courseProgressCount = ",CourseProgressCount);

        //validation of course Details
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Could not find this course"
            })
        }

        //find total time duration
        let totalDurationInSeconds = 0;
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration);
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
 
        //retrun response
        return res.status(200).json({
            success: true,
            data : {
                courseDetails,
                totalDuration,
                completedVideos: CourseProgressCount?.completedVideos
                   ? CourseProgressCount?.completedVideos : [],
            },
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


exports.getInstructorCourses = async(req,res) => {
    try{
        //get instructor id
        const instructorId = req.body.id;

        //find instructor details
        const instructorDetails = await Course.find({instructor:instructorId})
            .sort({ createdAt : -1})

        //validation
        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"instructor not founded"
            })
        }


        //return response
        //console.log("Instructor courses insid course controller = ",instructorDetails);
        return res.status(200).json({
            success:true,
            message:"get instructor courses successfully",
            data:instructorDetails
        })
    }
    catch(error){
        console.log("Error while find instructor details = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//Delete course
exports.deleteCourse = async(req,res) => {
    try{
        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if(!course){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            });
        }

        //unerolled students from course
        const studentsEnrolled = Course.studentsEnrolled || [];
        
            for(const studentId of studentsEnrolled){
                await User.findByIdAndUpdate(studentId,{
                    $pull:{course:courseId},
                })
            }


        //delete sections and subsections
        const courseSections = Course.courseContent || [] ;
        for(const sectionId of courseSections){
            //delete sub section of the section
            const section = await Section.findById(sectionId);
            if(section){
                const subSections = section.subSection;
                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            //delete section
            await Section.findByIdAndDelete(sectionId);
        }

        //delete course
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"course deleted successfully",
        });
    }
    catch(error){
        console.log("Error while deleting course = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}