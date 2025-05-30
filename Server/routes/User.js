const express = require("express");
const router = express.Router();

const {
    login,
    signUp,
    sendOTP,
    changePassword,
} = require("../controllers/Auth");

const { resetPasswordToken,resetPassword } = require("../controllers/ResetPassword");

const { auth } = require("../middelwares/auth");

//                             ****************************************
//******************************        Authentication routes         ******************************
//                             ****************************************

router.post("/login",login);
router.post("/signup",signUp);
router.post("/sendOTP",sendOTP);
router.post("/changePassword",auth,changePassword);


//                             ****************************************
//******************************            Reset Password            ******************************
//                             ****************************************

router.post("/reset-password-token",resetPasswordToken);
router.post("/reset-password",resetPassword);

module.exports = router;