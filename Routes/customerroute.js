const customerController=require("../controllers/customercontroller")
const upload=require("../middellware/upload")
const route=require("express").Router()
route.post("/add",upload.single("picture") ,customerController.CreateCustomer)
route.get("/get",customerController.listecustomer)
route.delete("/delete/:id",customerController.deleteCustomer)
route.get("/get/:id",customerController.listebyid)
route.put("/update/:id",upload.single("picture"),customerController.updateCustomer)
module.exports=route
