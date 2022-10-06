const JWT = require("jsonwebtoken");
const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");


exports.isAuthorizedUser = async (req, res, next) => {
    try {
        const { access_token } = req.cookies

        if (!access_token) {
            return next(new ErrorHandler("Unknown user", 401))
        }

        const { id } = JWT.verify(access_token, process.env.JWT_SECRET) // ========== Decoded ID ========== //

        // setting current user on req
        req.user = await User.findById(id)

        return next()
    } catch (error) {
        res.status(404).json({
            error
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    const { access_token } = req.cookies

    if (!access_token) {
        return next(new ErrorHandler("Only admin can access this route", 403))
    }

    try {
        const { id } = JWT.verify(access_token, process.env.JWT_SECRET) // ========== Decoded ID ========== //

        if (!id) return next(new ErrorHandler("Please login again", 403))

        const user = await User.findById(id)

        if (user.role !== "admin") return next(new ErrorHandler("Only admin can access this route", 401))

        req.user = user
        return next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message
        })
    }
}

/** Check user role middleware
 * ? --------------- why we are return a callback function to the middleware?? ---------------
 * * if we don't nest this function with callback function we get error, because middleware only works with callback function
 * ! ERROR will be: Route.get()/put()/post()/delete() requires a callback function but got a [object Undefined]
 */

/* 
// ? Way: 1
exports.authorizeRole = (...roles) => { // (... roles) <-- it makes all the parameters an array
    return (req, res, next) => {

    }
} 
*/

// ? Way: 2
exports.authorizeRole = (...roles) => async (req, res, next) => {

    try {
        const { access_token } = req.cookies
        const { id } = JWT.verify(access_token, process.env.JWT_SECRET)
        const user = await User.findById(id)
        req.user = user

        if (!roles.includes(user.role)) return next(new ErrorHandler("Only admins can access this route", 401))

        return next()
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message,
            msg: "Unknown"
        })
    }

    next()
}


/* const { access_token } = req.cookies
const { id } = JWT.verify(access_token, process.env.JWT_SECRET)
console.log(id);
next() */