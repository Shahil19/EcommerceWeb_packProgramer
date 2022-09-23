const ErrorHandler = require("../utils/errorHandler")

module.exports = (err, req, res, next) => {

    // wrong mongodb id error handling
    if (err.name === "CastError") {
        const message = `Resource not found ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    res.status(err.status).json({
        success: false,
        message: err.message,
    })
}