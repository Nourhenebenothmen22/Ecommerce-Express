const mongoose=require("mongoose")
const gallerieschema=new mongoose.Schema({
    image:{
        type:String
    }
})
const productSchema=new mongoose.Schema({
    ref:{
        type:String,
        unique: true

    },
    description:{
        type:String,
    },
    price:{
        type:Number
    },
    galleries:[gallerieschema] ,
    qte: {
        type: Number
    },
    provider:{
        type:mongoose.Types.ObjectId,
        ref:'provider'
    },
    subcategorie:{
        type:mongoose.Types.ObjectId,
        ref:'subcategorie'
    },
    order: { 
        type:mongoose.Types.ObjectId, 
        ref: 'order',
        unique: true 
    }

})
module.exports=mongoose.model('product',productSchema)
