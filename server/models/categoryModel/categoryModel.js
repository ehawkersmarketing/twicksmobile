const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: true
  },
  categoryImg: {
    type: String,
    trim: true,
    required: true,
  }
});

const CategoryModel = mongoose.model("category", CategorySchema);
module.exports = CategoryModel;
