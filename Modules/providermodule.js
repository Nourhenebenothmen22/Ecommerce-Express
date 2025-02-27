const mongoose=require("mongoose")
const usermodule = require("./usermodule")
const providerScheama=new mongoose.Schema({
    matricule:{
        type:Number,
        unique: true
    },
    company:{
        type:String
    },
    services:{
        type:String
    },
    products:[{
        type:mongoose.Types.ObjectId,
        ref:'product'
    }]

})
usermodule.discriminator("provider",providerScheama)
module.exports=mongoose.model("provider")