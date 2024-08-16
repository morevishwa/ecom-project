const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isManager: { type: Boolean, required: true },
  address: { type: String, required: false },
});
const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
