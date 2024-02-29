const blogModel = require("../../models/blogModel/blogModel");

exports.composeBlog = async (req, res) => {
  try {
    const { title, content, image, readingTime, tags } = req.body;
    if (!title || !content) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newBlog = new blogModel({
      title,
      content,
      readingTime,
      image: image,
      tags: tags,
    });
    await newBlog.save();
    // console.log("image =>", image);
    return res.status(200).send({
      success: true,
      message: "New blog uploaded",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while composing blog",
      error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    // console.log(blogs);
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.getRecentBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({}).sort({ createdAt: -1 })
      .limit(3);
    // console.log(blogs);
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel.findById(blogId);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "No blog found for given ID",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Fetched single blog",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in getting blog by ID",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, content, readingTime, image } = req.body;
    const updatedBlog = await blogModel.findByIdAndUpdate(
      { _id: blogId },
      { title, content, readingTime, image }
    );
    await updatedBlog.save();
    return res.status(200).send({
      success: true,
      message: "Blog updated.",
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: true,
      messaage: "Error while updating blogs",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel.findByIdAndDelete(blogId);
    if (blog) {
      return res.status(200).send({
        success: true,
        message: "Blog deleted!!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

exports.searchBlog = async (req, res) => {
  try {
    const { search } = req.body;
    const blog = await blogModel.find({});
    let searchedBlog = [];
    for (let i = 0; i < blog.length; i++) {
      if (blog[i].title.toLowerCase().includes(search) || blog[i].content.toLowerCase().includes(search)) {
        searchedBlog.push(blog[i]);
      }
    }
    if (!blog) {
      return res.status(500).send({
        success: false,
        message: "No blog found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All blogs list",
      data: searchedBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all blogs",
      error,
    });
  }
};
