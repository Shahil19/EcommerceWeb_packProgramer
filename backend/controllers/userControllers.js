const ApiFeatures = require("../utils/apiFeatures")
const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userSchema")

// ------------------ GET controllers ------------------------
// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find(req.query)
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
}

// get user details
exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Please enter e valid user ID"
        })
    }
}

// ------------------ POST controllers ------------------------
// register a user
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "sample public id",
                url: "sample url"
            }
        })

        res.status(201).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

// ------------------ PUT controllers ------------------------

// update user role -- ADMIN
exports.updateUserRole = async (req, res, next) => {
    try {
        const updatedData = {
            role: req.body.role
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Please enter a valid User id",
            error
        })
    }
}


