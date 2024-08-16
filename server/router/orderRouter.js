const express = require("express");
const isAuth = require("../middleware/auth");
const { placeOrder, allorders, manageOrder } = require("../controllers/orderController");
// const { addToCart, removeFromCart, changeQty, getAllCartItems } = require("../controllers/cartController");
const orderRouter = express.Router();

orderRouter.get("/",isAuth,allorders)
orderRouter.post("/placeorder",isAuth,placeOrder)
// orderRouter.delete("/removefromcart/:id",isAuth,removeFromCart,)
orderRouter.patch("/manage/:id",isAuth,manageOrder)
module.exports = orderRouter