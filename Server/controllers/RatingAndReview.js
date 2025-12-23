const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");

//create rating
exports.createRating = async(req,res) => {
    try{
        const {rating , review , courseId} = req.body;

        const userId = req.user.id;
        console.log("Request data = ",rating," ",review," ",courseId," ",userId);

    //check user is enrolled or not
    const courseDetials = await Course.findOne({_id:courseId ,
        studentsEnrolled:{$elemMatch:{$eq:userId}}
    });

    console.log("courseDetails info inside ratingAndR controller = ",courseDetials);
    
    if(!courseDetials){
        return res.status(403).json({
            success:false,
            message:"user is not enrolled in this course"
        })
    }
    //check user is already reviewed or not
    const alreadyReviewed = await RatingAndReview.findOne({user:userId,course:courseId});

    console.log("alreadyReviewed info inside rar controller = ",alreadyReviewed);

    if(alreadyReviewed){
        return res.status(403).json({
            success:false,
            message:"user is alredy reviewed in this course"
        })
    }
    //create rating
    const ratingReview = await RatingAndReview.create({rating,review,user:userId,course:courseId})
    
    console.log("ratingReview info inside rAr controller = ",ratingReview);
    
    //push rating in course
    const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
        {$push:{ratingAndReview:ratingReview._id}},
        {new:true}
    );
    console.log("updatedCourseDetails insid rar controller",updatedCourseDetails);
    
    //return response
    return res.status(200).json({
        success:true,
        message:"rating and review create successfully"
    })
    }
    catch(error){
        console.log("Error while creating rating = ",error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


//get average rating
exports.getAverageRating = async(req,res) => {
    try{
        const courseId = req.body.courseId;

        //calcutate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{course:new mongoose.Types.ObjectId(courseId)}
            },
            {
                $group:{_id:null,averageRating:{$avg:"$rating"}}
            }
        ])
    
        //return response
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            });
        }
        
        //if no rating and review is exist
        return res.status(200).json({
            success:true,
            message:"no any rating and review is available",
            averageRating:0,
        })
    }
    catch(error){
        console.log("Error while calculating average rating = ",error);
        return res.status(500).json({
            success:false,
            message:"Error while calculating average rating",
        })
    }
}



//get all rating and reviews
exports.getAllRating = async(req,res) => {
    try{
        const allReview = await RatingAndReview.find({})
        .sort({rating:"desc"})
        .populate({path:"user",select:"firstName lastName eamil image"})
        .populate({path:"course",select:"courseName"})
        .exec();

        return res.status(200).json({
            success:true,
            message:"all review fatched successfully",
            data:allReview,
        });
    }
    catch(error){
        console.log("Error while gatting all rating and review = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}