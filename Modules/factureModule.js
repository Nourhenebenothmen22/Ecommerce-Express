const mongoose=require("mongoose")
const factureSchema=new mongoose.Schema({
    ref:{
        type:String,
        unique: true
    },
    remise:{
        type:Number
    },
    description:{
        type:String
    }
})
module.exports=mongoose.model("facture",factureSchema)