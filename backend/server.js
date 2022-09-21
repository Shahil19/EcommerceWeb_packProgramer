const app = require('./app.js')
const dotenv = require('dotenv')

//config
dotenv.config({ path: 'backend/config/config.env' })

app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
})