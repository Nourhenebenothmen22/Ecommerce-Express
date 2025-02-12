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
        type:Number,
        min: 0
    },
    galleries:[gallerieschema] ,
    qte: {
        type: Number,
        min: 0, 
        default: 0 
    }

})
module.exports=mongoose.model('product',productSchema)
