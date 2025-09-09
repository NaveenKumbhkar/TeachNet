const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerate = require("otp-generator");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const Profile = require("../models/Profile");
const bcrypt = require("bcryptjs");
const {passwordUpdated } = require("../mail/templates/passwordUpdate");

require("dotenv").config();

//OTP handler
exports.sendOTP = async (req, res) => {
    try {
        //feach email from request body
        const { email } = req.body;

        //chech if user already exist
        const checkUserPresent = await User.findOne({ email });

        //if user alreay exist then send response
        if (checkUserPresent) {
            //console.log("User is already exist.....");
            return res.status(401).json({
                success:false,
                message:"User is already exist"
            })
        }

        //generate otp
        var otp = otpGenerate.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("generated OTP = ",otp);

        //check on database thar is a uniqe otp or not 
        const result = await OTP.findOne({otp:otp});

        while(result){
            otp = otpGenerate.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        //create a entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBody = ",otpBody);

        //return success
        res.status(200).json({
            success:true,
            message:"OTP send successfully",
            otp,
        })

    }
    catch (error) {
        console.log("Error while generating OTP = ",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
};

//Signup handler
exports.signUp = async(req,res) => {
    try{
        //feach data from request body
        const {firstName,lastName,email,password,confirmPassword,otp,accountType,contactNumber} = req.body;
        //console.log("Server Reponse........");
        //validation ki required filed fill ho
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                success:true,
                message:"all fileds are required",
            })
        }

        //check password and confirm password are same or not
        if(password !== confirmPassword){
            return res.status(401).json({
                success:true,
                message:"both passwords are different",
            })
        }

        //check user already exist or not 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success:true,
                message:"User is already registered",
            })
        }

        //find most recent OTP stored in database
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("recent OTP = ",recentOTP);
        //validation of recent otp
        if(recentOTP.length === 0){
            return res.status(400).json({
                success:false,
                message:"length of OTP is equale to 0",
            })
        } else if(recentOTP[0].otp !== otp){
            return res.status(401).json({
                success:false,
                message:"recent otp and otp are different",
            })
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create user
        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true);

        //entry create in DB
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            contactNumber,
            accountType:accountType,
            approved: approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"User registered successfully",
            user,
        })
    }
    catch(error){
        console.log("Error occured while signup user " , error);
        return res.status(500).json({
            success:false,
            message:"User can not be registered , please try again"
        })
    }
};

//Login handler
exports.login = async(req,res) => {
    try{
        //feach data from request body
        const {email,password} = req.body;

        //data validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        //check user exits or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User is not registered , Please signup first",
            })
        }

        //generate JWT after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            });

            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires:new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                user,
                token,
                message:"User logged in successfully",
            })
        } else{
            return res.status(401).json({
                success:false,
                message:"password is incorrect",
            })
        }
    }
    catch(error){
        console.log("Error while user login = ",error);
        return res.status(500).json({
            success:false,
            message:"Login failed please try again",
        })
    }
};

//change password
exports.changePassword = async(req,res) => {
    try{
        //feach data from request body
        const userDetails = await User.findById(req.user.id);

        //feach oldPassword , newPassword, confirmNewPassword
        const { oldPassword, newPassword } = req.body;

        //validation
        const isPasswordMatch = await bcrypt.compare(oldPassword,userDetails.password)
        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"The password is incorrect"
            });
        }

        //update password in database
        const encryptedPassword = await bcrypt.hash(newPassword,10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password:encryptedPassword},
            {new:true}
        );

        //send mail - password updated
        try{
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email response after sending email = ",emailResponse);
        }
        catch(error){
            //console.log("mail send error = ",error.message)
            return res.status(500).json({
                success:false,
                message:"Error occurred while sending email to user",
                message: error.message,
            })
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Password updated successfully"
        })
    }
    catch(error){
        console.log("Error while updating password = ",error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while sending email to user",
            message: error.message,
        });
    }
}