const express = require("express");
const AWS = require('aws-sdk');
const {
  getAllReviews, addReview, getReviewsById
} = require("../../controlllers/review/reviewController");

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

router.post("/addReview", addReview);
router.get("/getAllReviews", getAllReviews);
router.get("/getReviewById/:id", getReviewsById);

module.exports = router;