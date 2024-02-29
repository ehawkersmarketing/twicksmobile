const mongoose = require("mongoose");

const blogModel = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  readingTime: {
    type: String,
  },
  tags: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const blogSchema = mongoose.model("blog", blogModel);
module.exports = blogSchema;
