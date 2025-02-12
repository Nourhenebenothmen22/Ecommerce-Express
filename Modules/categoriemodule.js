const mongoose = require("mongoose");
const categorieSchema=new mongoose.Schema({
    name:{
        type:String

    },
    description:{
        type:String
    }

})
module.exports=mongoose.model('categorie',categorieSchema)