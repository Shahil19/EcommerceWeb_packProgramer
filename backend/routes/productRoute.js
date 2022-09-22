// here we define routes of API
const express = require("express")
const { getAllProduct, createProduct } = require("../controllers/productController")
const router = express.Router()


router.route('/products').get(getAllProduct)

//POST methods
router.route('/product/new').post(createProduct)

module.exports = router
