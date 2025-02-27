const mongoose = require("mongoose");
const subcategoriecontroller = require("../controllers/subcategoriecontroller");
const categorieSchema=new mongoose.Schema({
    name:{
        type:String

    },
    description:{
        type:String
    },
    subcategorieId:[{
        type:mongoose.Types.ObjectId,
        ref:"subcategorie"

    }]
    
    

})
module.exports=mongoose.model('categorie',categorieSchema)