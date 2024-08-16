const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },

  status: { type: String, required: true },
  orderId: { type: Number }
});
const OrderModel = mongoose.model("order", orderSchema);
module.exports = OrderModel;
