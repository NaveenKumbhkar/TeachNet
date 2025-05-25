const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {
        //feach data
        const { sectionName, courseId } = req.body;
        //validation
        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "All fields are require"
            })
        }
        //create section
        const newSection = await Section.create({ sectionName });
        //push into course
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }
        )
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec()

        //retrun response
        return res.status(200).json({
            success: true,
            message: "Section created successfully",
            updatedCourseDetails,
        })
    }
    catch (error) {
        console.log("Error while creating section : ", error);
        return res.status(500).json({
            success: false,
            message: "Error while creating section"
        })
    }
}

//update section
exports.updateSection = async (req, res) => {
    try {
        //featch data
        const { sectionName, sectionId, courseId } = req.body;
        //validation
        if (!sectionName || !sectionId || !courseId) {
            return res.status(401).json({
                success: false,
                message: "All fields are require",
            })
        }
        //update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
        
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

        //return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            data: course,
        })
    }
    catch (error) {
        console.log("Error while updating section : ", error);
        return res.status(500).json({
            success: false,
            message: "Error while updating section"
        })
    }
}

//delete section
exports.deleteSection = async (req, res) => {
    try {
        //feach data - assuming that we are sending id in params
        const { sectionId ,courseId } = req.params;//body;

        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})


        const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

        //delete section
        await Section.findByIdAndDelete(sectionId);
        //TODO : do we need to delete entry from the course schema ????

        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        
        //return response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        })
    }
    catch (error) {
        console.log("Error while deleting seciton : ", error);
        return res.status(500).json({
            success: false,
            message: "somthin went wrong while deleting section",
        })
    }
}