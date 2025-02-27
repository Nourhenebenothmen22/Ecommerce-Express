const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
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
    },
    token:{
        type:String
    }

},baseOptions)
userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
module.exports=mongoose.model("user",userSchema)
