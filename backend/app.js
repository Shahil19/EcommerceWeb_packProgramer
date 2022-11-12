const express = require("express");
const app = express()
const cookie_parser = require("cookie-parser")
const cors = require("cors")

// app.use(cors())
app.use(express.json())
app.use(cookie_parser())
app.use(cors())

// router imports
const product = require('./routes/productRoute');
const user = require("./routes/userRoute")
const order = require("./routes/orderRoute")

app.use('/api/v1', product)
app.use("/api/v1", user)
app.use("/api/v1", order)

// custom middleware for Error Handling
const errorMiddleware = require("./middleware/error")
app.use(errorMiddleware)

module.exports = app