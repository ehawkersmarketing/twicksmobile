const mongoose = require("mongoose");
const express = require("express");

//GET ALL STORES
exports.getAllStores = async (req, res) => {
  try {
    // const stores = await storeModel.find({});
    // if (!stores) {
    //   return res.status(200).send({
    //     success: false,
    //     message: "No stores found",
    //   });
    // }
    return res.status(200).send({
      success: true,
      message: "All stores list",
      //   storeCount: stores.length,
      //   stores,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting all stores",
      error,
    });
  }
};
