const express = require("express");
const router = express.Router();

const { auth } = require("../middleware/authentication");
const ProductController = require("../app/controllers/ProductController");

router.post("/create", ProductController.createProduct);
router.put("/update/:id", auth, ProductController.updateProduct);
router.delete("/delete/:id", auth, ProductController.deleteProduct);
router.get("/get-all-products", ProductController.getAllProducts);
router.get("/get-details-product/:id", ProductController.getDetailsProduct);

module.exports = router;