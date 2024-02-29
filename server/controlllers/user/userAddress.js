const userAddress = require('../../models/userModel/userAddress')
const userModel = require("../../models/userModel/userModel");

module.exports.putUserAddress = async (req, res, next) => {
    try {
        const { userId, street, landmark, city, country, phone, dob, state, zipCode, email } = req.body;
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            if (email) {
                await userModel.findOneAndUpdate({ _id: userId }, { email: email, phone: phone, dob: dob });
            }
            const address = await userAddress.findOne({ userId: user._id });
            if (address) {
                const newUserAddress = await userAddress.findOneAndUpdate({ userId: user._id }, {
                    street: street,
                    landmark: landmark,
                    city: city,
                    country: country,
                    state: state,
                    zipCode: zipCode
                });
                res.status(200).json({
                    success: true,
                    data: newUserAddress
                });
            } else {
                const newUserAddress = new userAddress({
                    userId: userId,
                    street: street,
                    landmark: landmark,
                    city: city,
                    country: country,
                    state: state,
                    zipCode: zipCode
                });
                await newUserAddress.save();
                res.status(200).json({
                    success: true,
                    data: newUserAddress
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to create user address"
        })
        next(error);
    }
};
module.exports.getUserAddress = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await userAddress.findOne({ userId: id });
        if (user) {
            return res.status(200).json({
                success: true,
                data: user
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Failed to create user address"
        })
        next(error);
    }
};

module.exports.updateUserAddress = async (req, res) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const { street, landmark, city, state, country, zipCode } = req.body;
        const userId = id;
        // console.log(userId)

        const updatedUserAddress = await userAddress.findOneAndUpdate({ userId: id },
            {
                street, landmark, city, state, country, zipCode
            }
        );
        // console.log(updatedUserAddress)
        res.status(200).json({
            success: true,
            data: updatedUserAddress,
            message: "User Updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data: error,
            message: "Error while updating the User Address",
        });
    }


}
