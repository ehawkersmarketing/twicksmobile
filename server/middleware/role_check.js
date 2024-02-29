const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("./../models/userModel/userModel");

exports.AdminRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let phone = decoded.phone;
      let user = await userModel.findOne({ phone });
      if (user) {
        if (user.role.role === "Admin") {
          next();
        } else {
          res.json({
            success: false,
            message: "unAuthorized user",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Admin check middleware",
    });
  }
};

exports.EditorRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let phone = decoded.phone;
      let user = await userModel.findOne({ phone });
      if (user) {
        if (user.role.role === "Editor" || user.role.role === "Admin") {
          next();
        } else {
          res.json({
            success: false,
            message: "unAuthorized user",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Editor check middleware",
    });
  }
};

exports.ViewerRole = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let phone = decoded.phone;
      let user = await userModel.findOne({ phone });
      if (user) {
        if (user.role.role === "Viewer" || user.role.role === "Admin" || user.role.role === "Editor") {
          next();
        } else {
          res.json({
            success: false,
            message: "unAuthorized user",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Viewer check middleware",
    });
  }
};
