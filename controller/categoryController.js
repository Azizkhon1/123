const CategoryModel = require("../model/categoryModel");

const getCategoryController = async (req, res) => {
  try {
    const all_categorys = await CategoryModel.find();
    res
      .status(200)
      .json({ message: "Categorylar muvaffaqiyatli olindi", all_categorys });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const getOneCategoryController= async (req,res) =>{
  try {
    const {id} = req.params
    const one_category = await CategoryModel.findById(id)
    res
      .status(200)
      .json({ message: "Category muvaffaqiyatli olindi", one_category });
  } catch (error) {
    res.status(500).json({message:"Servverda xatolik bor", error})
  }
}

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const newP = new CategoryModel({ name });
    await newP.save();
    res.status(201).json({ message: "Category created", newP });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const update_category = await CategoryModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Muvaffaqiyatli yangilandi", update_category });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const delete_category = await CategoryModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Category o'childi", delete_category });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};


const categoryListController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;

    const Category_list = await CategoryModel.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const totalC = await CategoryModel.countDocuments();

    res.status(200).json({
        message: `${limit} Categorys`,
        totalCategory:totalC,
        totalPages: Math.ceil(totalC / limit),
        Category_list 
    });
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik bor", error });
  }
};

module.exports = {
  getCategoryController,
  getOneCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
  categoryListController
};
