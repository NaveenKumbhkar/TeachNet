const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
});

async function sendVarificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,"verification email",emailTemplate(otp));
        console.log("Email send successfully ",mailResponse);
    }
    catch(error){
        console.log("Error occured while sending emails",error);
        throw error;
    }
}

OTPSchema.pre("save",async function (next) {
    console.log("New document saved to database");

    if(this.isNew){
        await sendVarificationEmail(this.email,this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP",OTPSchema);