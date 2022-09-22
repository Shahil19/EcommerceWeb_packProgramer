const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product Name"]
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
    rating: {
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
                required: true
            },
            review: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
},
    { collection: "products" })

module.exports = mongoose.model("Product", productSchema)