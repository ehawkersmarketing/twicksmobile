const express = require("express");
const {
  payFunction,
  checkStatusFunction,
  getOrderLogFunction,
  refundFunction,
} = require("../../controlllers/pay/payController");

const router = express.Router();

router.post("/phonePePayment", payFunction);

router.get("/checkStatus", checkStatusFunction);

router.post("/getOrderLog", getOrderLogFunction);

router.post("/refund", refundFunction);
module.exports = router;
