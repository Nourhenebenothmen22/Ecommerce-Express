const ProductController=require("../controllers/ProductController")
const upload = require("../middellware/upload")
const route=require("express").Router()
//add avec plusieurs images
route.post("/add",upload.array('image'),ProductController.createProduct)
route.get("/get",ProductController.listProduct)
route.put("/update/:id",upload.array('image'),ProductController.updateproduct)
route.get("/get/:id",ProductController.listProductById)
route.delete("/delete/:id",ProductController.deleteproduct)
module.exports=route
