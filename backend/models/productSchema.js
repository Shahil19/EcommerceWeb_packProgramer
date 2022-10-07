const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
    },
    description: {
        type: String,
        required: [true, "Please enter product Name"]
    },
    price: {
        type: Number,
        maxLength: [8, "Price can not exceed 8 figure"],
        required: [true, "Please enter product price"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter product Category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product Stock"],
        maxLength: [4, "Stock can not exceed 4 figure"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: [true, "name is required"]
            },
            rating: {
                type: Number,
                required: [true, "rating number is required"]
            },
            comment: {
                type: String,
                required: [true, "comment id is required"]
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: [true, "User id is required"]
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
},
    { collection: "products" }
)

module.exports = mongoose.model("Product", productSchema)