const { default: mongoose } = require("mongoose");
const CartModel = require("../model/cartModel");

const addToCart = async (req, res) => {
  try {
    const { user, product, quantity } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(product)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid user or product ID",
      });
    }
    const checkCurrentItempresnt = await CartModel.findOne({ user, product });

    if (checkCurrentItempresnt) {
      checkCurrentItempresnt.quantity = checkCurrentItempresnt.quantity + 1;

      await CartModel.findOneAndReplace(
        { _id: checkCurrentItempresnt._id },
        checkCurrentItempresnt
      );

      const cartItem = await CartModel.findById(checkCurrentItempresnt._id);
      return res.status(201).json({ success: true, cartItem: cartItem });
    }
    // Create a new cart item
    const newCartItem = new CartModel({
      user,
      product,
      quantity,
    });

    // Save the cart item to the database
    const savedCartItem = await newCartItem.save();

    // Send a success response with the saved cart item
    res.status(201).json({ success: true, cartItem: savedCartItem });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({ success: false, errors: validationErrors });
    }

    // Handle other errors
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.id;

    // Check if the provided cart item ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid cart item ID",
      });
    }

    // Find the cart item by ID and remove it
    const removedCartItem = await CartModel.findOneAndDelete({
      _id: cartItemId,
    });

    // Check if the cart item was found and removed
    if (!removedCartItem) {
      return res.status(404).json({
        success: false,
        error: "Cart item not found",
      });
    }

    // Send a success response with the removed cart item
    res.status(200).json({ success: true, cartItem: removedCartItem });
  } catch (error) {
    // Handle other errors
    console.error("Error removing item from cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const changeQty = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    // Check if the provided cart item ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(cartItemId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid cart item ID",
      });
    }
    const item = await CartModel.findById(cartItemId);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "item not found",
      });
    }

    item.quantity = quantity;
    // Find the cart item by ID
    await CartModel.findOneAndReplace({ _id: cartItemId }, item);

    const cartItem = await CartModel.findById(cartItemId);

    res.status(200).json({ success: true, cartItem: cartItem });
  } catch (error) {
    // Handle other errors
    console.error("Error increasing quantity of item in cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const getAllCartItems = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid user ID",
      });
    }

    // Find all cart items associated with the user ID
    const cartItems = await CartModel.find({ user: userId }).populate(
      "product"
    );

    // Send a success response with the list of cart items
    res.status(200).json({ success: true, cartItems });
  } catch (error) {
    // Handle other errors
    console.error("Error getting cart items:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


module.exports = { addToCart, removeFromCart, changeQty,getAllCartItems };
