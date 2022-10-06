const express = require("express")
const { registerUser, getUsers, getUserDetails, updateUserRole, deleteUser, logout } = require("../controllers/userControllers")
const isAuthorizedUser = require("../middleware/isAuthorizedUser")
const router = express.Router()

// Get all users
router.route("/admin/users").get(getUsers)

router.route("/me/:id").get(getUserDetails)

// register a user Route
router.route("/register").post(registerUser)

// logout user
router.route("/logout/:id").get(logout)

router.route("/admin/user/:id").put(updateUserRole).delete(deleteUser)


module.exports = router