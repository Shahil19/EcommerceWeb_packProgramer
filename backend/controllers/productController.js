// here we define the functions of API

const Product = require("../models/productSchema")
const ApiFeatures = require("../utils/apiFeatures")
const ErrorHandler = require("../utils/errorHandler")

// RED: CatchAsyncError handler



// ------------- GET method controllers --------------
// Get all products
exports.getAllProduct = async (req, res) => {
    // search filters
    const apiFeature = new ApiFeatures(Product.find(), req.query).search()


    const products = await apiFeature.query
    try {
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        return res.send(error.message)
    }
}

// Get single product
exports.getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    try {
        if (!product) {
            next(new ErrorHandler("Product not found", 404))
            return
        }

        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        return res.send(error.message)
    }
}


// ------------- POST method controllers --------------
// Create product -- ADMIN
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)
    try {
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        return res.send(error.message)
    }

}

// ------------- PUT method controllers --------------
// Update product - ADMIN
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    try {
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
        return res.send(error.message)
    }

}

// ------------- DELETE method controllers --------------
// Delete Product -- ADMIN
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    try {
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
        return res.send(error.message)
    }
}