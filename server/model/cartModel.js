const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
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

  quantity: { type: Number, required: true },
});
const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
