const { instance } = require("../config/razorpay")
const User = require("../models/User");
const Course = require("../models/Course");
const mailSender = require("../utils/mailSender");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

//create a order for razorpay
exports.capturePayments = async(req,res) => {
    //get course_id and userId 
    const {courses} = req.body;
    const userId = req.user.id;

    //validation 
    if(courses.length === 0){
        return res.status(403).json({
            success:false,
            message:"Please provide courses IDs",
        });
    }

    let total_amount = 0;

    for(const course_id of courses){
        try{
            let course = await Course.findById(course_id);
            if(!course){
                return res.status(403).json({
                    success:false,
                    message:"couser is not found",
                });
            }
    
            //User is already pay for this same course
            const uid = await mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(403).json({
                    success:false,
                    message:"User is already enroll in this course",
                });
            }

            total_amount += course.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }


    //create order
    const options = {
        amount : total_amount*100,
        currency: "IND",
        receipt : Math.random(Date.now()).toString(),
    }

    try{
        //initiate the payments using razorpay
        const razorpayResponse = await instance.order.create(options);
        console.log("Razorpay response = ",razorpayResponse);
        return res.status(200).json({
            success:true,
            data:PaymentResponse,
        });
    }
    catch(error){
        console.log("Error occure while creating order of razorpay = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}


//verify signature of razorpay and server
exports.verifyPayment = async(req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;

    const userId = req.user.id;

    //validation
    if(
        !razorpay_order_id || 
        !razorpay_payment_id || 
        !razorpay_signature || 
        !courses || 
        !userId
    ){
        return res.stratus(403).json({
            success:false,
            message:"All fields are required",
        });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id ;

    //generate signature
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
        .update(body.toString()).digest("hex");

    //check both signature
    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses , userId , res)
        return res.status(200).json({
            success:true,
            message:"payment verified"
        });
    } 

    //return response
    return res.status(403).json({
        success:false,
        message:"payment failed"
    })
}

//send payment success email
exports.sendPaymentSuccessEmail = async(req,res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(401).json({
            success:false,
            message:"all fileds are required"
        });
    }

    try{
        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount / 100,
                orderId,
                paymentid,
            )
        )
    }
    catch(error){
        console.log("Error while sending email = ",error);
        return res.status(500).json({
            success:false,
            message:"Could not send mail"
        });
    }
}


//Enroll student in courses
const enrollStudents = async(courses , userId , res) => {
    if(!courses || !userId){
        return res.status(400).json({
            success:false,
            message:"please provide required fileds"
        });
    }

    for(const courseId of courses){
        try{
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push:{ studentsEnrolled:userId}},
                {new:true}
            )

            if(!enrolledCourse){
                return res.status(404).json({
                    success:false,
                    message:"course not found"
                });
            }

            const courseProgress = await CourseProgress.create({
                courseID : courseId,
                userID : userId,
                completedVideo : [],
            });

            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push:{
                        courses: courseId,
                        coursesProgress: coursesProgress._id,
                    },
                },
                { new: true }
            )
            const emilaResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(
                    enrolledCourse.courseName,
                    `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
                )
            );

            console.log("Email sent successfully = ",emilaResponse);

        }
        catch(error){
            console.log("Error while enroll course and student");
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
}