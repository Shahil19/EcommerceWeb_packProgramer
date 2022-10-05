const express = require("express")
const { registerUser, getUsers } = require("../controllers/userControllers")
const router = express.Router()

// Get all users
router.route("/users").get(getUsers)

// register a user Route
router.route("/register").post(registerUser)

module.exports = router