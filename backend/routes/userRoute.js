const express = require("express")
const { registerUser, getUsers, getUserDetails, updateUserRole, deleteUser, logout, login, updatePassword } = require("../controllers/userControllers")
const isAuthorizedUser = require("../middleware/isAuthorizedUser")
const router = express.Router()

// Get all users Route -- ADMIN
router.route("/admin/users").get(getUsers)

// get owe / user details
router.route("/me/:id").get(getUserDetails)

// register a user Route
router.route("/user/register").post(registerUser)

// login user Route
router.route("/user/login").post(login)

// logout user Route
router.route("/user/logout/:id").get(logout)

// update user password
router.route("/user/updatePassword").put(updatePassword)

// update user role and delete user Route -- ADMIN
router.route("/admin/user/:id").put(updateUserRole).delete(deleteUser)


module.exports = router