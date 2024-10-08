const crypto = require("crypto");

exports.generateSignature = (orderId, paymentId) => {
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  hmac.update(orderId + "|" + paymentId);
  return hmac.digest("hex");
};
