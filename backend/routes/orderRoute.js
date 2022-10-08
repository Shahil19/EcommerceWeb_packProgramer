const express = require("express")
const { createOrder, getSingleOrder, getMyOrders, getAllOrders } = require("../controllers/oderController")
const { isAuthorizedUser, authorizeRole } = require("../middleware/isAuthorized")
const router = express.Router()

// get all orders and total ordered price -- ADMIN
router.route("/orders").get(getAllOrders)

// get order details
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder)

// get logged user / my orders
router.route("/me/orders").get(isAuthorizedUser, getMyOrders)

// create new order
router.route("/order/new").post(isAuthorizedUser, createOrder)

module.exports = router