const express = require("express")
const { createOrder, getSingleOrder, getMyOrders, getAllOrders, updateStatus, deleteAOrder } = require("../controllers/oderController")
const { isAuthorizedUser, authorizeRole } = require("../middleware/isAuthorized")
const router = express.Router()

// get all orders and total ordered price -- ADMIN
router.route("/admin/orders").get(isAuthorizedUser, authorizeRole("admin"), getAllOrders)

// get order details
router.route("/order/:id").get(isAuthorizedUser, getSingleOrder)

// get logged user / my orders
router.route("/me/orders").get(isAuthorizedUser, getMyOrders)

// create new order
router.route("/order/new").post(isAuthorizedUser, createOrder)

// update order status -- ADMIN
router.route("/admin/order/update/:id").put(isAuthorizedUser, authorizeRole("admin"), updateStatus)

// delete a single order status -- ADMIN
router.route("/admin/order/delete/:id").delete(isAuthorizedUser, authorizeRole("admin"), deleteAOrder)


module.exports = router