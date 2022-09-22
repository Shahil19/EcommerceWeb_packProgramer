// here we define routes of API
const express = require("express")
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController")
const router = express.Router()

// GET methods
router.route('/products').get(getAllProduct)
router.route('/product/:id').get(getProductDetails)

//POST methods
router.route('/product/new').post(createProduct)

// PUT methods
router.route('/product/:id').put(updateProduct)

// DELETE methods
router.route('/product/:id').delete(deleteProduct)

module.exports = router
