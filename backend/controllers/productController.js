// here we define the functions of API

const Product = require("../models/productSchema")

// Get all products
exports.getAllProduct = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
}

// Create product -- ADMIN
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}

// Update product - ADMIN
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
}