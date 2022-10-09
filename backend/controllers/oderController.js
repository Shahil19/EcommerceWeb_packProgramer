const Order = require("../models/orderSchema")
const Product = require("../models/productSchema")
const ErrorHandler = require("../utils/errorHandler")

// ---------------- GET controllers
// get order details
exports.getSingleOrder = async (req, res, next) => {

    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")
        // here populate method brings the user details 
        // from the ref - reference was given on orderSchema
        // user argument tells which field to populate
        // name email arguments tells which values to bring in

        if (!order) return next(new ErrorHandler("order not found with this id", 404))

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

// get logged in user / my orders details
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })

        res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

// get all orders and total order price -- ADMIN
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()

        let totalOrderPrice = 0;
        orders.forEach(order => {
            totalOrderPrice += order.totalPrice
        })
        res.status(200).json({
            success: true,
            totalOrderPrice,
            orders
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

// ---------------- POST controllers
// create new order
exports.createOrder = async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    try {
        const order = await Order.create({
            // paidAt: Date.now(),
            // deliveredAt: Date.now(),
            user: req.user._id,
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

// PUT controllers
// update order status -- ADMIN
exports.updateStatus = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id)

        if (!order) return next(new ErrorHandler("Order not found", 404))

        if (order.orderStatus === "Delivered") { return next(new ErrorHandler("You have already delivered this order", 400)) }

        // updating order status
        order.orderStatus = req.body.status

        // updating deliver time
        if (req.body.status === "Delivered") {
            // if admin delivers the order updating the product stock
            order.orderItems.forEach((order) => {
                updateStock(order.product, order.quantity)
            })
            order.deliveredAt = Date.now()
        }

        // saving the changed made in the order
        await order.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

// update stock function
const updateStock = async (id, quantity) => {
    const product = await Product.findById(id)
    product.stock -= quantity

    await product.save({ validateBeforeSave: false })
}