const providercontroller=require("../controllers/providercontroller")
const route=require("express").Router()
route.post("/add",providercontroller.Createprovider)
route.get("/get",providercontroller.listeProvider)
route.get("/get/:id",providercontroller.getproviderById)
route.delete("/delete/:id",providercontroller.deleteprovider)
route.put("/update/:id",providercontroller.Updateprovider)
module.exports=route