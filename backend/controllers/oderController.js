const Order = require("../models/orderSchema")

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