const Subscription = require("../models/subscription.model");
const {
  createOrderService,
  verifyPaymentService,
} = require("../services/razorpay.service");

const buyCourse = async (req, res) => {
  try {
    const { courseId, userId, amount } = req.body;

    // Create a new subscription
    const subscription = new Subscription({
      userId,
      courseId,
      amount,
    });

    const order = await createOrderService(req.body.amount);

    // Save the order ID to the subscription
    subscription.orderId = order.id;
    await subscription.save();

    // Return the order ID and other details to the client
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error(err);
    const subscription = await Subscription.findOneAndUpdate(
      { orderId },
      { paymentStatus: "failed" }
    );
    res.status(500).json({ error: "Failed to create order" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Verify the payment signature
    const paymentStatus = await verifyPaymentService({
      orderId,
      paymentId,
      signature,
    });

    if (!paymentStatus) {
      throw new Error("Invalid payment signature");
    }

    // Update the subscription status to paid
    const subscription = await Subscription.findOneAndUpdate(
      { orderId },
      { paymentStatus: "paid" }
    );

    res.json({ message: "Payment successful" });
  } catch (err) {
    console.error(err);
    const subscription = await Subscription.findOneAndUpdate(
      { orderId },
      { paymentStatus: "failed" }
    );
    res.status(500).json({ error: "Failed to verify payment" });
  }
};

module.exports = {
  buyCourse,
  verifyPayment,
};
