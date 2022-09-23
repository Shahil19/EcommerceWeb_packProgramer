const express = require("express");
const app = express()

app.use(express.json())

// router imports
const product = require('./routes/productRoute');

app.use('/api/v1', product)

// custom middleware for Error Handling
const errorMiddleware = require("./middleware/error")
app.use(errorMiddleware)

module.exports = app