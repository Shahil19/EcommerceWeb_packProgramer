const mongoose = require("mongoose")
// name: shahil pass: Ojateq7SdjXwTv4A (ecommerce_packProgra)
const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URI)
        .then(data => console.log(`Mongodb connected with server: ${data.connection.host}`))

}

module.exports = connectDatabase