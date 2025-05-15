
const {getCategoryController,getOneCategoryController,createCategoryController,updateCategoryController,deleteCategoryController,categoryListController} = require("../controller/categoryController")

const express = require("express")

const router = express.Router()

router.get("/get-category", getCategoryController)

router.get("/get_single-category/:id", getOneCategoryController)

router.post("/create-category", createCategoryController)

router.put("/update-category/:id", updateCategoryController)

router.delete("/delete-category/:id", deleteCategoryController)

router.get("/category-list", categoryListController)

module.exports = router