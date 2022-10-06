const mongoose = require("mongoose")
const validator = require("validator") // to validate if email is real
const JWT = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [8, "Minimum password length is 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToke: String,
    resetPasswordExpire: Date
},
    { collection: "users" }
)


// --------------------- custom methods with schema ---------------------
// create JWT token with custom method
userSchema.methods.getJwtToken = function () {
    const token = JWT.sign({ id: this._id }, process.env.JWT_SECRET)
    return token
}

module.exports = mongoose.model("User", userSchema)