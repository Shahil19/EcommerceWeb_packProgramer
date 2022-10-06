const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userSchema")
const cookie = require("cookie-parser")

// ------------------ GET controllers ------------------------
// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const usersCount = await User.countDocuments()
        const users = await User.find(req.query)
        res.status(200).json({
            success: true,
            usersCount,
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

        // ------------- creating JWT token
        const token = user.getJwtToken()

        res
            .status(201)
            .cookie("access_token", token, { httpOnly: true, }) // sending token to cookie through cookie-parser
            .json({
                success: true,
                user
            })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

// ---- Logout user
exports.logout = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res
            .clearCookie("access_token")
            .status(200)
            .json({
                success: true,
                message: "Logged out successfully"
            })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "user not found",
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


// ------------------ DELETE controllers ------------------------
// delete user -- ADMIN
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return next(new ErrorHandler("User id is not valid", 404))
        }

        const userRemoved = await user.remove()
        res.status(200).json({
            success: true,
            message: " user deleted successfully",
            userRemoved
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User id is not valid",
            error
        })
    }
}
