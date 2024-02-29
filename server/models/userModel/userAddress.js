const mongoose = require('mongoose');

const userAddress = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    street: {
        type: String,
        required: true,
    },
    landmark: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'IND',
    },
    zipCode: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("UserAddress", userAddress);