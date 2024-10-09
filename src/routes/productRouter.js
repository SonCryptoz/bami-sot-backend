const express = require("express");
const router = express.Router();

const { auth, authUser } = require("../middleware/authentication");
const ProductController = require("../app/controllers/ProductController");

router.post("/create", ProductController.createProduct);

module.exports = router;