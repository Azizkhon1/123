const mongoose = require("mongoose")

// Schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age:{
        type: Number,
    },
    price:{
        type: Number,
    },  
}); 

// Model
const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel