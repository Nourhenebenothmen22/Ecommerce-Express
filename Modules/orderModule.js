const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    qte:{
        type:Number
    },
    price:{
        type:Number
    }
})
module.exports=mongoose.model("order",orderSchema)