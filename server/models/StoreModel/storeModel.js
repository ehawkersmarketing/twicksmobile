const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    location: [{ type: String }],
    storeName: {
      type: String,
      require: [true, "Store Name is required"],
    },
    address: {
      type: String,
      require: [true, "Address is required"],
    },
    inventory: {
      type: String,
      require: [true, "Inventory is required"],
    },
    ownerName: {
      type: String,
      require: [true, "Owner Name is required"],
    },
    phoneNumber: {
      type: Number,
      require: [true, "Phone Number is required"],
    },
  },
  { timestamps: true }
);

const storeModel = mongoose.model("Store", storeSchema);

module.exports = storeModel;
