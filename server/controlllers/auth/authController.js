const userModel = require("../../models/userModel/userModel.js");
const jwt = require("jsonwebtoken");
const roleModel = require("../../models/roleModel/roleModel.js");

exports.signup = async (req, res) => {
  try {
    const { userName, phone, role } = req.body;
    const phoneAlreadtExist = await userModel.findOne({ phone });
    if (phoneAlreadtExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    let newUser;
    if (role) {
      newUser = new userModel({
        userName: userName,
        phone: phone,
        role: role,
      });
    } else {
      newUser = new userModel({
        userName: userName,
        phone: phone,
      });
    }
    const user = await newUser.save();
    return res.status(200).json({
      success: true,
      message: "User Created Successfully ",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, token, otp } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.otp == otp) {
      let user = await userModel.findOne({ phone }).populate("role");
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User is not registered",
        });
      }
      res.json({
        success: true,
        data: user,
        message: "User Login Successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

module.exports.sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    // const snd = await twilioClient.messages.create({
    //     body: `Your OTP is ${otp}`,
    //     from: 'your_twilio_phone_number',
    //     to: phone
    // });
    if (true) {
      console.log(otp);
      const token = jwt.sign({ phone, otp }, process.env.JWT_SECRET);
      res.json({ success: true, token: token });
    } else {
      res.json({ success: false, message: "Failed to send otp" });
    }
  } catch (error) {
    console.log(error.toString());
    res.json({ success: false, message: "Failed to send otp" });
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { token, otp } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.otp == otp) {
      res.json({ success: true, message: "OTP verified successfully" });
    } else {
      res.status(401).json({ success: false, error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, error: "Invalid token" });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const { search } = req.body;
    let user = await userModel.find({
      userName: { $regex: search },
    }).populate("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not found",
      });
    }
    res.json({
      success: true,
      data: user,
      message: "User found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

exports.addRole = async (req, res) => {
  const role = req.body.role;
  const permission = req.body.permission;

  const newRole = await new roleModel({ role, permission });
  const isSaved = await newRole.save();

  if (isSaved) {
    return res.send({ code: 200, message: "role added" });
  } else {
    return res.send({ code: 500, message: "server err" });
  }
};

exports.user = async (req, res) => {
  try {
    const { phone, email, userName, role } = req.body;
    let user = await userModel.find({}).populate("role");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not found",
      });
    }
    res.json({
      success: true,
      data: user,
      message: "User found",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

exports.getUserById = async(req,res) =>{
    try {
      const user = await userModel.findById({ _id: req.params.id });
      if (!user) {
        return res.status(500).send({
          success: false,
          message: "No User found",
        });
      }
      return res.status(200).send({
        success: true,
        message: "User fetched !!",
        data: user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error While fetching the user",
        error,
      });
    }
  };


exports.updateUserById = async(req,res) => {
  try {
    const { id } = req.params;
    const {userName , phone} = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        userName , phone
      }
    );

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      data: error,
      message: "Error while updating the User",
    });
  }

}