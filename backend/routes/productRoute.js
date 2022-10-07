// here we define routes of API
const express = require("express")
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview } = require("../controllers/productController")
const { isAuthorizedUser, authorizeRole } = require("../middleware/isAuthorized")

const router = express.Router()

// get all products
router.route('/products').get(getAllProduct)

// get single product detail
router.route('/product/:id').get(getProductDetails)

// create new product
router.route('/admin/product/new').post(isAuthorizedUser, authorizeRole("admin"), createProduct)

// update product detail
router.route('/admin/product/:id').put(isAuthorizedUser, authorizeRole("admin"), updateProduct)

// delete a product
router.route('/admin/product/:id').delete(isAuthorizedUser, authorizeRole("admin"), deleteProduct)

// add / update product review
router.route('/review').put(isAuthorizedUser, createProductReview)

module.exports = router
