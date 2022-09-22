// here we define the functions of API

const Product = require("../models/productSchema")

exports.getAllProduct = (req, res) => {
    res.status(200).json({ message: "Route is working fine" })
}

// Create product
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
}