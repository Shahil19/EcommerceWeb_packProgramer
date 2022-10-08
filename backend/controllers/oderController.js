const Order = require("../models/orderSchema")
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

// get logged in user orders details
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
            paidAt: Date.now(),
            deliveredAt: Date.now(),
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