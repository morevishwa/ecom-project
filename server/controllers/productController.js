const ProductModel = require("../model/productModel");

const addProductToInventry = async (req, res) => {
  try {
    // Destructure product details from request body
    const imagePath = req.file.filename;

    console.log("addProductToInventry  imagePath:", imagePath);
    // console.log("filename",req.filename)
    const { name, description, weight, quantity, price } = req.body;
    // const image = res.locals.url;
    const newProduct = new ProductModel({
      name,
      image: imagePath,
      description,
      weight,
      quantity,
      price,
    });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Send a success response
    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({ success: false, errors: validationErrors });
    }

    // Handle other errors
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find();

    // Send a success response with the list of products
    res.status(200).json({ success: true, products });
  } catch (error) {
    // Handle errors
    console.error("Error getting all products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const editProductQty = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;

    console.log("editProductQty  quantity:", quantity);

    // Find the product by ID
    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    product.quantity = quantity;
    await ProductModel.findOneAndReplace({_id:productId},product)
    const updatedProduct  = await ProductModel.findById(productId);

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    // Check for validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );

      return res.status(400).json({ success: false, errors: validationErrors });
    }

    // Handle other errors
    console.error("Error editing product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const deletedProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID and remove it
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    // Check if the product was found and deleted
    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // Send a success response with the deleted product
    res.status(200).json({ success: true, product: deletedProduct });
  } catch (error) {
    // Handle other errors
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  addProductToInventry,
  getAllProducts,
  editProductQty,
  deletedProduct,
};
