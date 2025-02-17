const commandeController=require("../controllers/CommandeController")
const route=require("express").Router()
route.post("/add",commandeController.createCommande)
route.delete("/delete/:id",commandeController.Deletecommande)
route.get("/get/:id",commandeController.listeCommandeByid)
route.get("/get",commandeController.listecommande)
route.put("/update/:id",commandeController.Updateprovider)
module.exports=route
