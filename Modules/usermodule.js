const mongoose=require("mongoose")
const baseOptions = {
    discriminatorKey: 'itemtype', // our discriminator key, could be anything
    collection: 'items', // the name of our collection
  };
const userSchema=new mongoose.Schema({
    fullname:{
           type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:Number
    },
    code:{
        type:String
    },
    verify:{
        type:Boolean,
        default:false
    }

},baseOptions)
module.exports=mongoose.model("user",userSchema)
