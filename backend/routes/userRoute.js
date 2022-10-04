const express = require("express")
const { registerUser } = require("../controllers/userControllers")
const router = express.Router()

// register a user Route
router.route("/register").post(registerUser)

module.exports = router