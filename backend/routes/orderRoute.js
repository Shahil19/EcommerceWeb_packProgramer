const express = require("express")
const { createOrder, getSingleOrder } = require("../controllers/oderController")
const { isAuthorizedUser } = require("../middleware/isAuthorized")
const router = express.Router()

// get order details
router.route("/order/:id").get(getSingleOrder)

// create new order
router.route("/order/new").post(isAuthorizedUser, createOrder)

module.exports = router