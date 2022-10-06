const express = require("express")
const { registerUser, getUsers, getUserDetails, updateUserRole, deleteUser, logout, login, updatePassword, getOwnData, updateProfile } = require("../controllers/userControllers")
const { authorizeRole, isAuthorizedUser } = require("../middleware/isAuthorized")

const router = express.Router()

// Get all users Route -- ADMIN
router.route("/admin/users").get(authorizeRole("admin"), getUsers)

// get own / user details
router.route("/me").get(isAuthorizedUser, getOwnData)

// register a user Route
router.route("/user/register").post(registerUser)

// login user Route
router.route("/user/login").post(login)

// logout user Route
router.route("/user/logout/:id").get(logout)

// update user password
router.route("/user/updatePassword").put(isAuthorizedUser, updatePassword)

// update user profile
router.route("/me/updateProfile").put(isAuthorizedUser, updateProfile)

// get a user details -- ADMIN
router.route("/admin/user/:id").get(authorizeRole("admin"), getUserDetails)

// update user role and delete user Route -- ADMIN
router.route("/admin/user/:id").put(authorizeRole("admin"), updateUserRole).delete(authorizeRole("admin"), deleteUser)


module.exports = router