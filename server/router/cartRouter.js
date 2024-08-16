const express = require("express");
const isAuth = require("../middleware/auth");
const { addToCart, removeFromCart, changeQty, getAllCartItems } = require("../controllers/cartController");
const cartRouter = express.Router();

cartRouter.get("/:id",isAuth,getAllCartItems)
cartRouter.post("/addtocart",isAuth,addToCart)
cartRouter.delete("/removefromcart/:id",isAuth,removeFromCart,)
cartRouter.post("/chnageqty",isAuth,changeQty,)
module.exports = cartRouter