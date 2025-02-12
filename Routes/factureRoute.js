const factureController=require("../controllers/factureController")
const route=require("express").Router()
route.post("/add",factureController.createfacture)
route.delete("/delete/:id",factureController.deleteFacture)
route.get("/get/:id",factureController.getFactureById)
route.get("/get/",factureController.getFacture)
route.put("/update/:id",factureController.Updatefacture)

module.exports=route