const { default: mongoose } = require("mongoose");
const OrderModel = require("../model/ordersModel");
const CartModel = require("../model/cartModel");

const placeOrder = async (req, res) => {
  try {
    const { user, product, status } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(product)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid user or product ID",
      });
    }

    // Check if the product is in the user's cart
    const cartItem = await CartModel.findOne({ user, product });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        error: "Product not found in the user's cart",
      });
    }
    const orderId = await OrderModel.find();

    // Create a new order
    const newOrder = new OrderModel({
      user,
      product,
      status,
      orderId: orderId.length + 1,
    });
    // newOrder.orderId =  {}
    console.log("placeOrder  newOrder:", newOrder);

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Remove the product from the user's cart after placing the order
    await CartModel.findByIdAndDelete(cartItem._id);

    // Send a success response with the saved order
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({ success: false, errors: validationErrors });
    }

    // Handle other errors
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const allorders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await OrderModel.find().populate("user").populate("product");

    // Send a success response with the list of orders
    res.status(200).json({ success: true, orders });
  } catch (error) {
    // Handle other errors
    console.error("Error getting all orders:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const manageOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid order ID",
      });
    }

    // Find the order by ID
    const order = await OrderModel.findOne({_id:orderId});

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    // Update the status of the order
    order.status = status;

    // Save the updated order to the database
    const updatedOrder = await order.save();

    // Send a success response with the updated order
    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({ success: false, errors: validationErrors });
    }

    // Handle other errors
    console.error("Error updating order status:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
module.exports = { placeOrder, allorders, manageOrder };
