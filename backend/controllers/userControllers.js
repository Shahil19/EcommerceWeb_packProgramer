const ApiFeatures = require("../utils/apiFeatures")
const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/userSchema")

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