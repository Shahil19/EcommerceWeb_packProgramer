// here we define the functions of API
const Product = require("../models/productSchema")
const ApiFeatures = require("../utils/apiFeatures")
const ErrorHandler = require("../utils/errorHandler")

// RED: CatchAsyncError handler



// ------------- GET method controllers --------------
// Get all products
exports.getAllProduct = async (req, res) => {
    // search filters
    const resultPerPage = 5
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

    try {
        const products = await apiFeature.query
        const productCount = await Product.countDocuments()

        res.status(200).json({
            success: true,
            productCount,
            products
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

// Get single product
exports.getProductDetails = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            next(new ErrorHandler("Product not found", 404))
            return
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}


// ------------- POST method controllers --------------
// Create product -- ADMIN
exports.createProduct = async (req, res, next) => {
    // setting user id to the body before sending to the server
    req.body.user = req.user.id
    try {
        const product = await Product.create(req.body)
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }

}

// ------------- PUT method controllers --------------
// Update product - ADMIN
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id)
        if (!product) {
            next(new ErrorHandler("Product not found", 404))
            return
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
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }

}

// ------------- DELETE method controllers --------------
// Delete Product -- ADMIN
exports.deleteProduct = async (req, res, next) => {

    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            next(new ErrorHandler("Product not found", 404))
            return
        }

        // deleting the product
        const result = await product.remove()

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            result
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}