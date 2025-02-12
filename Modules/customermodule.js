const mongoose=require("mongoose")
const usermodule=require("./usermodule")
const customerScheam=new mongoose.Schema({
    picture:{
        type:String
    },
    address:{
        type:String
    },
    CIN:{
        type:Number
    },
    City:{
        type:String
    }

})
usermodule.discriminator("customer",customerScheam)
module.exports=mongoose.model("customer")