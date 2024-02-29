const express = require("express");
const {createTransaction} = require("../../controlllers/pay/payController");

const router = express.Router();

router.post("/createTransaction", createTransaction);

module.exports = router;
