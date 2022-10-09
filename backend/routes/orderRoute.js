const express = require("express")
const { createOrder, getSingleOrder, getMyOrders, getAllOrders, updateStatus } = require("../controllers/oderController")
const { isAuthorizedUser, authorizeRole } = require("../middleware/isAuthorized")
const router = express.Router()

// get all orders and total ordered price -- ADMIN
router.route("/orders").get(isAuthorizedUser, authorizeRole("admin"), getAllOrders)

// get order details
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder)

// get logged user / my orders
router.route("/me/orders").get(isAuthorizedUser, getMyOrders)

// create new order
router.route("/order/new").post(isAuthorizedUser, createOrder)

// update order status -- ADMIN
router.route("/order/update/:id").put(isAuthorizedUser, authorizeRole("admin"), updateStatus)


module.exports = router