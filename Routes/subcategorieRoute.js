const subcategorieController=require("../controllers/subcategoriecontroller")
const route=require("express").Router()
route.post("/add",subcategorieController.createSubcategorie)
route.get("/get",subcategorieController.listesubcategorie)
route.delete("/delete/:id",subcategorieController.Deletesubcategorie)
route.put("/update/:id",subcategorieController.UpdatesubCategorie)
route.get("/get/:id",subcategorieController.getSubcategorieById)
module.exports=route
