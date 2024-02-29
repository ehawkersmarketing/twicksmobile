const mongoose = require('mongoose')

const orderCountSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
        },
        orderCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("OrderCountModel", orderCountSchema);