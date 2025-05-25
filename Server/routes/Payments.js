const express = require("express");
const router = express.Router();

const {
    capturePayments, 
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

router.post("/capturePayment",auth,isStudent,capturePayments);
router.post("/verifiyPayment",auth,isStudent,verifyPayment);
router.post("/sendPaymentSuccessEmail",auth,isStudent,sendPaymentSuccessEmail);

module.exports = router;