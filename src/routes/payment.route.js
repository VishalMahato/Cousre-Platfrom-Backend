const express = require("express");
const {
  buyCourse,
  verifyPayment,
} = require("../controllers/payment.controller");

const paymentRouter = express.Router();
// Route to create an order
router.post("/buy-course", buyCourse);

// Route to verify payment
router.post("/verify-payment", verifyPayment);

module.exports = { paymentRouter };
