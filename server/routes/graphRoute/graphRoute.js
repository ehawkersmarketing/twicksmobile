const express = require("express");
const AWS = require('aws-sdk');
const {
  getGraph
} = require("../../controlllers/graph/graphController");

const router = express.Router();

router.get("/getAllGraph", getGraph);


module.exports = router;