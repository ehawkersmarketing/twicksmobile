const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  description:{
    type:String,
    trim:true
  },
  image: {
    type: String,
    trim: true,
    // required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

const ServiceModel = mongoose.model("service", ServiceSchema);
module.exports = ServiceModel;
