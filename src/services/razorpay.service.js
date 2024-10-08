const Razorpay = require("razorpay");
const { generateSignature } = require("../utils/crypto.utils");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Service to create an order
exports.createOrderService = async (amount) => {
  const options = {
    amount: amount * 100, // Convert amount to paise
    currency: "INR",
    receipt: "receipt#1",
  };
  return await razorpay.orders.create(options);
};

// Service to verify payment
exports.verifyPaymentService = (paymentDetails) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    paymentDetails;
  const generatedSignature = generateSignature(
    razorpay_order_id,
    razorpay_payment_id
  );
  return generatedSignature === razorpay_signature;
};
