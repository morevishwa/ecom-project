const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  weight: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
