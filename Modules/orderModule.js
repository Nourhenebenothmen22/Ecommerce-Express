const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    qte:{
        type:Number
    },
    price:{
        type:Number
    },
      commande:{
            type:mongoose.Types.ObjectId,
            ref:'commande'
        },
        product: { 
            type: mongoose.Types.ObjectId, 
            ref: 'product',
            unique: true 
        }
    
})
module.exports=mongoose.model("order",orderSchema)