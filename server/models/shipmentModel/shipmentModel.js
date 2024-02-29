const mongoose = require('mongoose')

const shipmentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Types.ObjectId,
            ref: 'Order'
        },
        approvalStatus: {
            type: String,
            default: "PENDING"
        },
        timestamp: {
            type: Date,
            default: Date.now(),
        }
    },
);

module.exports = mongoose.model("ShipmentModel", shipmentSchema);