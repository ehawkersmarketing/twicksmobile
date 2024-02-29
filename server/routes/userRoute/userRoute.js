const userAddressController = require("../../controlllers/user/userAddress");
const getUserAddress = require("../../controlllers/user/userAddress")
const express = require("express");
const router = express.Router();

router.post("/putUserAddress", userAddressController.putUserAddress);
router.get("/getUserAddress/:id", userAddressController.getUserAddress);

module.exports = router;