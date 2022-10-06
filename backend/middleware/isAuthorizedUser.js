const cookie = require("cookie-parser");
const ErrorHandler = require("../utils/errorHandler");
const isAuthorizedUser = (req, res, next) => {
    try {
        const { access_token } = req.cookies

        if (!access_token) {
            return next(new ErrorHandler("Unknown user", 401))
        }

        return next()
    } catch (error) {
        res.status(404).json({
            error
        })
    }
}
module.exports = isAuthorizedUser