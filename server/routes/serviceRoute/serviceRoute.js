const express = require("express");
const AWS = require("aws-sdk");
const {
  createService,
  getAllServices,
  getServicesById,
  updateService,
  deleteService,
  searchServices
} = require("../../controlllers/service/serviceController");

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

router.post("/uploadServiceImage", upload.single("image"), (req, res) => {
  // console.log(req.file);
  const params = {
    Bucket: S3_BUCKET_NAME,
    Key: `services/${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: "image/jpeg"
  };
  // console.log("params", params)

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

router.post("/createService", createService);
router.get("/getAllService", getAllServices);
router.post("/searchService", searchServices);
router.get("/getService/:id", getServicesById);
router.put("/updateService/:id", updateService);
router.delete("/deleteService/:id", deleteService)


module.exports = router;
