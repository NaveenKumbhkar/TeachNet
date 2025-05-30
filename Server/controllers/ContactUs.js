const mailSender = require("../utils/mailSender");
const  contactUsEmail = require("../mail/templates/contactFormRes");

exports.contactUsController = async (req,res) => {
    const {email,firstName,lastName,message,phoneNo,countryCode} = req.body;
    console.log(req.body);
    try{
        const emailRes = await mailSender(
            email,
            "Your Data send successfully",
            contactUsEmail(email,firstName,lastName,message,phoneNo,countryCode)
        );
        console.log("Emial Response = ",emailRes);
        return res.status(200).json({
            success:true,
            message:"Email send successfully",
        });
    }
    catch(error){
        console.log("Error while send email = ",error);
        return res.json({
            success:false,
            message:"something went wrong...",
        });
    }
}