const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userSchema")
const cookie = require("cookie-parser")
const { sendJwtToken } = require("../utils/sendJwtToken")

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

// get user details -- ADMIN
exports.getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) return next(new ErrorHandler("Not a user", 404))
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

// ---- Logout user
exports.logout = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return next(new ErrorHandler("User not found", 404))
        }

        res
            .clearCookie("access_token")
            .status(200)
            .json({
                success: true,
                message: "Logged out successfully"
            })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message

        })
    }

}

// ----- get Own(user) Data
exports.getOwnData = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

// ------------------ POST controllers ------------------------
// register a user
exports.registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        if (!email | !password) {
            return next(new ErrorHandler("Please enter email and password both", 400))
        }

        const user = await User.create({
            name, email, password,
            avatar: {
                public_id: "sample public id",
                url: "sample url"
            }
        })

        // ------------- creating JWT token
        const token = user.getJwtToken()

        /* res
            .status(201)
            .cookie("access_token", token, { httpOnly: true, }) // sending token to cookie through cookie-parser
            .json({
                success: true,
                user
            }) */
        sendJwtToken(res, 201, token) // shorten code

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

// ----- Login user
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        if (!email | !password) {
            return next(new ErrorHandler("Please enter email and password both", 403))
        }

        const user = await User.findOne({ email }).select("+password")
        const token = user.getJwtToken()

        if (!user) {
            return next(new ErrorHandler("User not found", 404))
        }

        if (password !== user.password) {
            return next(new ErrorHandler("Wrong password", 403))
        }

        sendJwtToken(res, 200, token) // shorten code

        // res
        //     .status(200)
        //     .cookie("access_token", token, { httpOnly: true, }) // sending token to cookie through cookie-parser
        //     .json({
        //         success: true,
        //         user
        //     })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
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

        if (!user) return next(new ErrorHandler("Not a user", 404))

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,

        })
    }
}


// update user password 
exports.updatePassword = async (req, res, next) => {
    const { email, newPassword, confirmPassword, oldPassword } = req.body

    try {
        if (!oldPassword | !newPassword | !confirmPassword) {
            return next(new ErrorHandler("Please enter password", 403))
        }
        if (!email) {
            return next(new ErrorHandler("Please enter email", 403))
        }
        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler("Your newPassword and confirmPassword did not matched", 401))
        }

        const user = await User.findOne({ email }).select("+password")

        if (newPassword === user.password) {
            return next(new ErrorHandler("Your new password and last password is same", 403))
        }

        // updating password
        await User.findOneAndUpdate({ email: email }, { password: newPassword }, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}


// update user profile
exports.updateProfile = async (req, res, next) => {
    const { name } = req.body
    const updatedDoc = { name }

    try {
        const user = await User.findByIdAndUpdate(req.user.id, updatedDoc, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        if (!user) return next(new ErrorHandler("User not found", 404))

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
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
        return res.status(404).json({
            success: false,
            message: error.message,

        })
    }
}
