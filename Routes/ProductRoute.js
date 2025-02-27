const ProductController=require("../controllers/ProductController")
const upload = require("../middellware/upload")
const authentificationToken=require("../middellware/Authentificationtoken")
const validateAttribut=require("../middellware/validate")
const route=require("express").Router()
//add avec plusieurs images
route.post("/add"/* ,authentificationToken */,upload.array('image'),validateAttribut(["description","galleries","price","ref","qte"]),ProductController.createProduct)
route.get("/get",ProductController.listProduct)
route.put("/update/:id",upload.array('image'),ProductController.updateproduct)
route.get("/get/:id",ProductController.listProductById)
route.delete("/delete/:id",ProductController.deleteproduct)
module.exports=route
