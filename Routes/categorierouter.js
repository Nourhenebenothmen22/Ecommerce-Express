const categorieController=require("../controllers/categoriecontroller")
const route=require("express").Router()
route.post("/add",categorieController.createCategorie)
route.get("/get",categorieController.listeCategorie)
route.delete("/delete/:id",categorieController.DeleteCategorie)
route.put("/update/:id",categorieController.UpdateCategorie)
route.get("/get/:id",categorieController.getCategoriebyid)
module.exports=route