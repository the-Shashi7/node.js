const express = require("express");
const productController = require("../controller/productController");

const router = express.Router();

router
  .post("/products", productController.createProduct)
  .get("/products", productController.getProducts)
  .get("/products/:id", productController.getProduct)
  .put("/products/:id", productController.replaceProduct)
  .patch("/products/:id", productController.updateProduct)
  .delete("/products/:id", productController.deleteProduct);

exports.router = router;