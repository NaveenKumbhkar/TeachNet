const jwt = require("jsonwebtoken");
const User = require("../models/User");

require("dotenv").config();

exports.auth = async(req,res,next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token || req.header("Authorization").replace("Bearer ","");

        //console.log("Token in auth middelwares one = ",token);
        //if token missing then return response
        if(!token){
            return res.status(403).json({
                success:false,
                message:"Token is missing",
            })
        }
        //console.log("Token in auth middelwares two = ",token);
        //token verification
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:"token is invalied",
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:true,
            message:"something went wrong while validation the token",
        });
    }
}

exports.isStudent = async(req,res,next) => {
    try{
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again",
        })
    }
}

exports.isInstructor = async(req,res,next) => {
    try{
        const userDetails = await User.findOne({email: req.user.email});
        if(userDetails.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again",
        })
    }
}

exports.isAdmin = async(req,res,next) => {
    try{
        const userDetails = await User.findOne({email:req.user.email});
        if(userDetails.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin",
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified , please try again",
        })
    }
}