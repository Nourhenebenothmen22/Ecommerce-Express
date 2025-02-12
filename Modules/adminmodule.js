const mongoose=require("mongoose")
const usermodule=require('./usermodule')
const adminScheme=new mongoose.Schema({

})
usermodule.discriminator("admin",adminScheme)

module.exports=mongoose.model("admin")