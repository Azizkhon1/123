const ProductModel = require("../model/productModel");
const fs = require("fs");

const getProductController = async (req, res) => {
  try {
    const all_products = await ProductModel.find();
    res
      .status(200)
      .json({ message: "Productlar muvaffaqiyatli olindi", all_products });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const getOneProductController= async (req,res) =>{
  try {
    const {id} = req.params
    const one_product = await ProductModel.findById(id);
    res
      .status(200)
      .json({ message: "Product muvaffaqiyatli olindi", one_product });
  } catch (error) {
    res.status(500).json({message:"Servverda xatolik bor", error})
  }
}

const createProductController = async (req, res) => {
  try {
    const { name, age, price, } = req.body;
    const newP = new ProductModel({ name,age,price });
    await newP.save();
    res.status(201).json({ message: "Product created", newP });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const update_product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Muvaffaqiyatli yangilandi", update_product });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;

    const delete_product = await ProductModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Product o'childi", delete_product });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const productFilterController = async (req, res) => {
  try {
    const { color, minPrice, maxPrice,category } = req.query;
    let filter = {};

    if (color) {
      filter.color = color;
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) {
        filter.price.$gte = minPrice;
      }
      if (maxPrice) {
        filter.price.$lte = maxPrice;
      }
    }
    if(category){
      filter.category = category
    }

    const filter_product = await ProductModel.find(filter).populate("category").exec();
    res.status(200).json({ message: "Filter products", filter_product });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const productListController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;

    const product_list = await ProductModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("category").exec();

    const totalP = await ProductModel.countDocuments();

    res.status(200).json({
        message: `${limit} products`,
        totalProduct:totalP,
        totalPages: Math.ceil(totalP / limit),
        product_list
    });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const fileUpload = async (req,res) =>{
  try {
    res.status(200).json(req.file.filename)
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
}

const getFiles = async (req, res) => {
  try {
    fs.readdir("./images", (err, files) => {
      res.status(200).json(files);
    });
  } catch (error) {
    return res.status(500).json({ message: "Ошибка чтения папки", error });
  }
}

module.exports = {
  getProductController,
  getOneProductController,
  createProductController,
  updateProductController,
  deleteProductController,
  productFilterController,
  productListController,
  fileUpload,
  getFiles,
};
