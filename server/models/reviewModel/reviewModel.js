const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            review: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            count:{
                type:Number,
                default:0
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
});

module.exports = mongoose.model('review', reviewSchema);