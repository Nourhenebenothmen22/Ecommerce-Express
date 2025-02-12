const mongoose=require("mongoose")
const subcategorieSchema=new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    }

})
module.exports=mongoose.model("subcategorie",subcategorieSchema)