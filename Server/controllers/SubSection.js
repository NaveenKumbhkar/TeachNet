const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const {uploadImageToCloudinary} = require("../utils/imageUploaded");


exports.createSubSection = async(req,res) => {
    try{
        //feach data
        const {sectionId,title,description} = req.body;
        //exctract file/video
        const video = req.files.video;
        //validation data
        if(!sectionId || !title || !description){
            return res.status(401).json({
                success:false,
                message:"All fields are required",
            })
        }
        //file upload to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        //create a subsection
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });

        //update section with subsection objectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },
            {new:true},
        )
        .populate("subSection");
        //return response
        return res.status(200).json({
            success:true,
            message:"Sub-section created successfully",
            data:updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"someting went wrong while creating a subSection",
            error:error.message,
        })
    }
}

//update sub-section
exports.updateSubSection = async(req,res) => {
    try{
        //feach data
        const { sectionId , subSectionId, title, description } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection){
            return res.status(401).json({
                success:false,
                message:"sub section not found",
            });
        }

        if(title !== undefined){
            subSection.title = title
        }

        if(description !== undefined){
            subSection.description = description
        }

        if(req.files && req.files.video !== undefind){
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                proccess.env.FOLDER_NAME
            );
            subSection.videoUrl = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        //find updated section and return it
        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success:true,
            message:"Section updated successfully",
            data:updatedSection,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"something went wrong while updating subsection",
        })
    }
}

//delete sub-section
exports.deleteSubSection = async(req,res) => {
    try{
        const { subSectionId , sectionId } = req.body;
        await Section.findByIdAndUpdate(
            { _id:sectionId },
            {
                $pull:{ subSection: subSectionId,}
            }
        )

        const subSection = await SubSection.findOneAndDelete(subSectionId);

        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"subSection not found"
            });
        }

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success:true,
            message:"sub section delete successfully",
            data:updatedSection,
        })
    }
    catch(error){
        console.log("Error while delete sub section = ",error);
        return res.status(500).json({
            success:false,
            message:"something went wrong while deleting subsection",
        })
    }
}