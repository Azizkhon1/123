const mongoose = require("mongoose")

// Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    }
}); 

// Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel 