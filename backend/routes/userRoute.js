const express = require("express")
const { registerUser, getUsers, getUserDetails } = require("../controllers/userControllers")
const router = express.Router()

// Get all users
router.route("/admin/users").get(getUsers)

router.route("/me/:id").get(getUserDetails)

// register a user Route
router.route("/register").post(registerUser)

module.exports = router