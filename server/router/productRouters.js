const express = require("express");
const {
  addProductToInventry,
  getAllProducts,
  editProductQty,
  deletedProduct,
} = require("../controllers/productController");
const isAuth = require("../middleware/auth");
const upload = require("../middleware/multer");
const productRouter = express.Router();

productRouter.post("/addproduct", isAuth, upload.single("image"),addProductToInventry);
productRouter.get("/", isAuth, getAllProducts);
productRouter.patch("/editqty/:id", isAuth, editProductQty);
productRouter.delete("/delete/:id", isAuth, deletedProduct);
module.exports = productRouter;
