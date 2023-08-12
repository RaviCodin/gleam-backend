const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const errorMiddleWare = require('./middleWare/error.js');
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv');

//config
dotenv.config({path:"config/config.env"});

// app.use(express.bodyParser({limit: '50mb'}));
app.use(cors())
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit: '5mb'}));



const gleamInfo = require("./routes/gleamRoutes.js");

app.use("/api/v1",gleamInfo);


app.use(express.static(path.join(__dirname,"./build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./build/index.html"))
})

//errorMiddleWare use 
app.use(errorMiddleWare);


module.exports = app;