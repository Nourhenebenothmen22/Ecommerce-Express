const mongoose=require("mongoose")
const subcategorieSchema=new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    categorieId:{
            type:mongoose.Types.ObjectId,
            ref:"categorie"
    
        },
        products:[{
                type:mongoose.Types.ObjectId,
                ref:'product'
            }]

})
module.exports=mongoose.model("subcategorie",subcategorieSchema)