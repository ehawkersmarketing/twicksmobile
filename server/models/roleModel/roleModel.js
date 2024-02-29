const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "User",
  },
  permissions: [{ type: String }],
});

const roleModel = mongoose.model("role", roleSchema);
module.exports = roleModel;
