const express = require("express")
const { createOrder, getSingleOrder, getMyOrders } = require("../controllers/oderController")
const { isAuthorizedUser, authorizeRole } = require("../middleware/isAuthorized")
const router = express.Router()

// get order details
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder)

// get logged user / my orders
router.route("/me/orders").get(isAuthorizedUser, getMyOrders)

// create new order
router.route("/order/new").post(isAuthorizedUser, createOrder)

module.exports = router