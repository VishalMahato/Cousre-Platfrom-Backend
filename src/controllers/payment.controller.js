const {
  createOrderService,
  verifyPaymentService,
} = require("../services/razorpay.service");

exports.createOrder = async (req, res) => {
  try {
    const order = await createOrderService(req.body.amount);
    res.json(order);
  } catch (error) {
    res.status(500).send("Error creating order");
  }
};

exports.verifyPayment = (req, res) => {
  try {
    const isValid = verifyPaymentService(req.body);
    if (isValid) {
      res.send("Payment verified successfully");
    } else {
      res.status(400).send("Payment verification failed");
    }
  } catch (error) {
    res.status(500).send("Error verifying payment");
  }
};
