const express = require("express");
const { getAllStores } = require("../../controlllers/Store/storeController");

const router = express.Router();

// GET || getting all blogs
router.get("/stores", getAllStores);

module.exports = router;
