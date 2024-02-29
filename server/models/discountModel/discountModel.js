const mongoose = require("mongoose");
const discountModel = require("./discountModel");

const discountSchema = new mongoose.Schema(
  {
    products: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    unit: {
      type: String,
      require: [true, "unit is required"],
    },
    quantity: {
      type: Number,
      require: [true, "quantity is required"],
    },
  },

  { timestamps: true }
);

const discountModel = mongoose.model("Discount", discountSchema);

module.exports = discountModel;
