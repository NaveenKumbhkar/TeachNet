const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//reset password token
exports.resetPasswordToken = async (req, res) => {
    try {
        //feach email from request body
        const email = req.body.email;

        //validation 
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registerd with us",
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true });

        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send email containig the url
        await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`);

        //return response
        return res.status(200).json({
            success: true,
            message: "send email successfuly , check email and cheng password"
        })
    }
    catch (error) {
        console.log("error in sending reset email : ", error);
        return res.status(500).json({
            success: false,
            message: "something went wrong while sending reset passwore mail"
        })
    }
}

//reset password
exports.resetPassword = async (req, res) => {
    try {
        //feach data
        const { password, confirmPassword, token } = req.body;
        //validation
        if (password !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Both passwords are different",
            })
        }
        //feach user details from database
        const userDetails = await User.findOne({ token: token });
        //check user id valid or not
        if (!userDetails) {
            return res.status(403).json({
                success: false,
                message: "token is invalid"
            })
        }
        //check token expires time
        if (userDetails.resetPasswordExpires > Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Token is expired , please regenerate token"
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //update password in database
        const updatedPassword = await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true });
        //retun response
        return res.status(200).json({
            success: true,
            message: "password reset successfully"
        })
    }
    catch (error) { 
        console.log("Error occure in reseting password = ",error);
        return res.status(500).json({
            success:false,
            message:"something went wrong to reseting password",
        })
    }
}