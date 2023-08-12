const mongoose = require('mongoose')


const InfoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter  Name"],
        // minlength:[4,"please more than 4 charecter"]
    },
   
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        // validate:[validator.isEmail,"Please Enter valid Email"]
    },
    phone:{
            type:Number,
    },
    city:{
        type:String,
    },
    source:{
        type:String,
    },

    Date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("info",InfoSchema);
