const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/payment.controller");

const paymentRouter = express.Router();
// Route to create an order
router.post("/create-order", createOrder);

// Route to verify payment
router.post("/verify-payment", verifyPayment);

module.exports = { paymentRouter };
