const {
  getProductController,
  getOneProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  productFilterController,
  productListController,
  fileUpload,
  getFiles,
} = require("../controller/productController");
const express = require("express");
const upload = require("../midleware/fileUpload");
const router = express.Router();

router.post("/upload", upload.single("image"), fileUpload);

router.get("/images", getFiles);

router.get("/get-products", getProductController);

router.get("/get-products/:id", getOneProductController);

router.post("/create-products", createProductController);

router.put("/update-products/:id", updateProductController);

router.delete("/delete-products/:id", deleteProductController);

router.get("/products-filter", productFilterController);

router.get("/products-list", productListController);

module.exports = router;
