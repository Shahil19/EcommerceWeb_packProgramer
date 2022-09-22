// here we define routes of API
const express = require("express")
const { getAllProduct, createProduct, updateProduct } = require("../controllers/productController")
const router = express.Router()


router.route('/products').get(getAllProduct)

//POST methods
router.route('/product/new').post(createProduct)

// PUT methods
router.route('/product/:id').put(updateProduct)

module.exports = router
