const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // require: true,
    },
    description: {
      type: String,
      // require: true,
    },
    image: {
      type: String,
      // require: true,
    },
    price: {
      type: Number,
      // require: true,
    },
    quantity: {
      type: Number,
      // require: true,
    },
    units: {
      minQuantity: {
        type: Number,
      },
      maxQuantity: {
        type: Number,
      },
    },
    metric: {
      type: String,
    },
    weight: {
      type: Number,
    },
    companyName: {
      type: String,
      // require: true,
    },
    rating: {
      type: Number,
      // require: true,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
