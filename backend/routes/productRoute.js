// here we define routes of API
const express = require("express")
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController")
const { isAuthorizedUser, isAdmin, authorizeRole } = require("../middleware/isAuthorized")

const router = express.Router()

// get all products
router.route('/products').get(authorizeRole("admin"), getAllProduct)

// get single product detail
router.route('/product/:id').get(getProductDetails)

// create new product
router.route('/product/new').post(authorizeRole("admin"), createProduct)

// update product detail
router.route('/product/:id').put(authorizeRole("admin"), updateProduct)

// delete a product
router.route('/product/:id').delete(authorizeRole("admin"), deleteProduct)

module.exports = router
