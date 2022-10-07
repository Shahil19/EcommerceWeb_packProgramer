const express = require("express")
const { createOrder } = require("../controllers/oderController")
const { isAuthorizedUser } = require("../middleware/isAuthorized")
const router = express.Router()

router.route("/order/new").post(isAuthorizedUser, createOrder)

module.exports = router