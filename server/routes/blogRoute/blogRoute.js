const express = require("express");
const AWS = require('aws-sdk');
const {
  composeBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  searchBlog,
  getRecentBlogs,
} = require("../../controlllers/blog/blogController");

const multer = require("multer");
const router = express.Router();
const {
  AdminRole,
  EditorRole,
  ViewerRole,
} = require("../../middleware/role_check");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const S3_BUCKET_NAME = "tafi-ecom-img";

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/uploadBlogImage", upload.single("image"), async (req, res) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `blogs/${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: "image/jpeg"
  };

  s3.upload(params, (error, data) => {
    if (error) {
      // console.log(error);
    } else {
      // console.log(data.Location)
      res.json({
        success: true,
        message: "Image Uploaded Successfully",
        url: data.Location,
      });
    }
  });
});
router.post("/composeBlog", composeBlog);
router.get("/blogs", getAllBlogs);
router.get("/recentBlogs", getRecentBlogs);
router.get("/blog/:blogId", getBlogById);
router.put("/updateBlog/:blogId", updateBlog);
router.delete("/deleteBlog/:blogId", deleteBlog);
router.post("/searchBlog", searchBlog);

module.exports = router;