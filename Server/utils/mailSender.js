const axios = require("axios");
require("dotenv").config();


const mailSender = async (email,title,body) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [{ email: email }],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Email sent:", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "BREVO EMAIL ERROR:",
      error.response?.data || error.message
    );
  }
};

module.exports = mailSender;




// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const mailSender = async (email,title,body) => {
//     try{
//         let transpoter = nodemailer.createTransport({
//             host:process.env.MAIL_HOST,
//             port:process.env.MAIL_PORT,
//             secure: false,
//             auth:{
//                 user:process.env.MAIL_USER,
//                 pass:process.env.MAIL_PASS,
//             }
//         })

//         let info = await transpoter.sendMail({
//             from:`"TeachNet" - <teachnet609@gmail.com>`,
//             to:`${email}`,
//             subject:`${title}`,
//             html:`${body}`,
//         })
//         console.log(info);
//         return info;
//     }
//     catch(error){
//         console.log(error.message);
//     }
// }

// module.exports = mailSender;