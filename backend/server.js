const app = require('./app.js')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database.js')

// // handling uncaught exception
// process.on("uncaughtException", (err) => {
//     console.log(`Error: ${err.message}`);
//     console.log(`Shutting down the server due to uncaughtException`);

//     process.exit(1)
// })

//config
dotenv.config({ path: 'backend/config/config.env' })

// connect to database
connectDatabase()

const server = app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})

// unhandled promise rejection // AT THE BOTTOM
/* process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1)
    })
}) */