const app = require('./app.js')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database.js')

//config
dotenv.config({ path: 'backend/config/config.env' })

// connect to database
connectDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})