const express = require("express");
const AWS = require("aws-sdk");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  searchProductByCategory,
  getProductsById,
  CreateCategory,
  getAllCategory,
} = require("../../controlllers/product/productController");

const {
  AdminRole,
  EditorRole,
  ViewerRole,
} = require("../../middleware/role_check");

const router = express.Router();
const multer = require("multer");

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

router.post("/uploadImage", upload.single("image"), (req, res) => {
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `products/${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: "image/jpeg"
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      res.json({
        success: true,
        message: "Image Uploaded Successfully",
        url: data.Location,
      });
    }
  });
});

router.post("/createProduct", createProduct);
router.get("/allProducts", getAllProducts);
router.get("/getProduct/:id", getProductsById);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.post("/searchProduct", searchProduct);
router.get("/searchProduct/:category", searchProductByCategory);
router.post("/createCategory", CreateCategory);
router.get("/allCategory", getAllCategory);

module.exports = router;
