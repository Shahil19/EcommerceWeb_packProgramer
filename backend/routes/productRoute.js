// here we define routes of API
const express = require("express")
const { getAllProduct } = require("../controllers/productController")
const router = express.Router()


router.route('/products').get(getAllProduct)

module.exports = router
