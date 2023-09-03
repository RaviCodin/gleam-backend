const Infodb = require("../models/gleamModel");
const Errorhandler = require("../utils/errorhandler.js");
const catchAsyncError = require("../middleWare/catchAsyncError.js");
const sendEmail = require("../utils/Email");
const sheetAdd = require("../utils/sheetsAdd");
// const cloudinery = require("cloudinary")




exports.createInfo = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, city, source } = req.body;



  if (!name || !email || !phone || !city || !source) {
    next(new Errorhandler("Data not found", 403));
  }

  const info = await Infodb.create({ name, email, phone, city, source });

  const subject = `Gleam Education,  ${source}`;
  // const massage = "thankyou for join us.";

  const html = ` <div style=" max-width:100vw ; box-sizing: border-box; background-color: rgb(255, 255, 255);">
  <h1 style="background-color: red; padding: 0.5vmax; color: rgb(255, 255, 255);">Gleam</h1>
  <p style="font-size:medium; color: rgb(145, 145, 145); padding: 0 0.5vmax;">Study Abroad,
      Connect with India's leading Abroad education advisors</p>

    <div style="padding: 1vmax;  ">
      <h1 style="color: rgb(74, 74, 74); border-bottom: 1px solid gray; padding: 0.5vmax">Enquiry details</h1>
      <h4 style="color: gray;" >Email ${email}</h4>
      <h4 style="color: gray;">Name : ${name}</h4>
      <h4 style="color: gray;">phone : ${phone}</h4>
      <h4 style="color: gray;">Address : ${city}</h4>
      <h4 style="color: gray;">souce to track : ${source}</h4>
    </div>
</div > `

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

