const express = require("express");
const router = express.Router();

//Import course controllers 
const {
    createCourse,
    showAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
} = require("../controllers/Course");

//categories controllers import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category");

//Import section controllers
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

//Import sub-section controllers
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/SubSection");

//Import rating controllers
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controllers/RatingAndReview");

//import course progress controller
const {
    updateCourseProgress,
    getCompletedSubSectionsArray,
    getProgressPercentage,
} = require("../controllers/CourseProgress");

//import middlewares
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin,
} = require("../middelwares/auth");

//                             ****************************************
//******************************            Course routes             ******************************
//                             ****************************************

//create course route only for instructor
router.post("/createCourse",auth,isInstructor,createCourse);
//add a section to a course
router.post("/addSection",auth,isInstructor,createSection);
//update a section
router.post("/updateSection",auth,isInstructor,updateSection);
//delete section
router.post("/deleteSection",auth,isInstructor,deleteSection);
//edit sub-section
router.post("/updateSubSection",auth,isInstructor,updateSubSection);
//delete sub-section
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
//add sub-section to section
router.post("/addSubSection",auth,isInstructor,createSubSection);
//get all registered course
router.get("/getAllCourses",showAllCourses);
//get details for a specific course
router.post("/getCourseDetails",getCourseDetails);
//get detials for a specific course
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
//edit course 
router.post("/editCourse",auth,isInstructor,editCourse);
//get all courses for instructor
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses);
//delete a course
router.delete("/deleteCourse",deleteCourse);
//update course progress
router.post("/updateCourseProgress",auth,isStudent,updateCourseProgress);
//------------getCompletedSubSectionsArray
router.post("/getCompletedSubSectionsArray/:courseId",auth,isStudent,getCompletedSubSectionsArray);
//------------getProgressPercentage
//router.post("/getProgressPercentage",auth,isStudent,getProgressPercentage);

//                             ****************************************
//******************************  Categories routes (only for Admin)  ******************************
//                             ****************************************

//create category
router.post("/createCategory",auth,isAdmin,createCategory);
//show all category 
router.get("/showAllCategories",showAllCategories);
//get category page details
router.post("/getCategoryPageDetails",categoryPageDetails);


//                             ****************************************
//******************************          Rating and Review           ******************************
//                             ****************************************

router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRating);

module.exports = router;