const mongoose = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max){
    return Math.floor(Math.random() * max);
}


exports.createCategory = async(req,res) => {
    try{
        //feach data from request body
        const {name,description} = req.body;

        //validation on name
        if(!name){
            return res.status(400).json({
                success:false,
                message:"Category name is most needed",
            })
        }

        //create category in db
        const categoryDetails = await Category.create({name:name,description:description});
        console.log("category = ",categoryDetails);

        //return response
        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        });

    }
    catch(error){
        console.log("Error while creating category = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


//show all category handler
exports.showAllCategories = async(req,res) => {
    try{
        const allCategorys = await Category.find({});
        return res.status(200).json({
            success:true,
            message:"Gat all the category successfully",
            data:allCategorys,
        });
    }
    catch(error){
        console.log("Error while gating the all categories");
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};


//category page details
exports.categoryPageDetails = async(req,res) => {
    try{
        //feach category ID
        const { categoryId } = req.body;

        //get courses for this category
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path:"courses",
                match:{status:"Published"},
                //populate:"ratingAndReviews",
            })
            .exec();

        console.log("Selected Category = ",selectedCategory);
        //validation
        if(!selectedCategory){
            return res.status(401).json({
                success:false,
                message:"This category courses is not found",
            })
        }

        if(selectedCategory.courses.length === 0){
            console.log("No courses found for selected category");
            return res.status(404).json({
                success:false,
                message:"No courses found for the selected category",
            });
        }

        //get courses for different category
        const categoriesExceptSelected = await Category.find({_id:{$ne:categoryId}});
        const differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
        .populate({
            path:"courses",
            match:{status:"Published"},
        })
        .exec();

        //get top 10 rating courses
        const allCategories = await Category.find()
            .populate({
                path:"courses",
                match:{status:"Published"},
                populate:{
                    path:"Instructor",
                },
            })
            .exec();
        const allCourses = allCategories.flatMap((category) => allCategories.courses);
        const mostSellingCourses = allCourses.sort((a,b)=>b.sold - a.sold).slice(0,10);


        //return response
        res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            },
        });
    }
    catch(error){
        console.log("Error while finding category pate details = ",error);
        return res.status(500).josn({
            success:false,
            message:error.message,
        });
    }
}