const Infodb = require("../models/gleamModel");
const Errorhandler = require("../utils/errorhandler.js");
const catchAsyncError = require("../middleWare/catchAsyncError.js");
const sendEmail = require("../utils/Email");
const   sheetAdd = require("../utils/sheetsAdd");
// const cloudinery = require("cloudinary")




exports.createInfo = catchAsyncError(async (req, res, next) => {
  const { name,email,phone,city,source } = req.body;
  
 
  
  if(!name || !email || !phone || !city || !source){
    next(new Errorhandler("Data not found", 403));
  }

  const info = await Infodb.create({ name,email,phone,city,source });

  const subject = "Email from Fragrens";
  // const massage = "thankyou for join us.";
  const html =   `<h3>Email from ${email}</h3>
                  <h4>Name : ${name}</h4>
                  <h4>phone : ${phone}</h4>
                  <h4>city : ${city}</h4>
                  <h4>souce to track : ${source}</h4>`
  try{
    await sendEmail({subject,html})
    sheetAdd({ name,email,phone,city,source })

  }catch(error){
    console.log(error)
    next(new Errorhandler(error.massage, 500));
  }

 



  res.status(201).json({
    success: true,
    message: "Data Submit successfully",
    info,
  });
});

