// here we define the functions of API

const Product = require("../models/productSchema")
const ErrorHandler = require("../utils/errorHandler")


// ------------- GET method controllers --------------
// Get all products
exports.getAllProduct = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        success: true,
        products
    })
}

// Get single product
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        // res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
        // next({ massage: "Product not found", success: false })
        next(new ErrorHandler("Product not found", 404))
        return
    }

    res.status(200).json({
        success: true,
        product
    })
}


// ------------- POST method controllers --------------
// Create product -- ADMIN
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}

// ------------- PUT method controllers --------------
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

// ------------- DELETE method controllers --------------
// Delete Product -- ADMIN
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    // deleting the product
    const result = await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        result
    })
}