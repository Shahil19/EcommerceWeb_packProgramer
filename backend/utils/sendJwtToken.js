exports.sendJwtToken = (res, statusCode, token) => {
    res
        .status(statusCode)
        .cookie("access_token", token, { httpOnly: true, }) // sending token to cookie through cookie-parser
        .json({
            success: true
        })
}