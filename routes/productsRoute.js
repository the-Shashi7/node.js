const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router
  .post("/Products", productController.createProduct)
  .get("/Products", productController.getProducts)
  .get("/Products/:id", productController.getProduct)
  .put("/Products/:id", productController.replaceProduct)
  .patch("/Products/:id", productController.updateProduct)
  .delete("/Products/:id", productController.deleteProduct);

exports.router = router;