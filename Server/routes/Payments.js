const express = require("express");
const router = express.Router();

const {
    capturePayment, 
    verifyPayment, 
    sendPaymentSuccessEmail, 
} = require("../controllers/Payments");

//import middelwares
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin,
} = require("../middelwares/auth");

router.post("/capturePayment",auth,isStudent,capturePayment);
router.post("/verifiyPayment",auth,isStudent,verifyPayment);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail);

module.exports = router;