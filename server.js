const app = require("./app.js")
const dotenv = require('dotenv')




const createDBConnection = require("./config/database.js");


createDBConnection();

const PORT = process.env.PORT  || 5500

app.listen(PORT, ()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})