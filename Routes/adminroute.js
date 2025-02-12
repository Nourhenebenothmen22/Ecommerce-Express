const admincontroller=require("../controllers/admincontrolller")
const route=require("express").Router()
route.post("/add",admincontroller.createadmin)
route.get("/get",admincontroller.listeadmin)
route.put("/update/:id",admincontroller.Updateadmin)
route.get("/get/:id",admincontroller.getadminById)
route.delete("/delete/:id",admincontroller.Deleteadmin)


module.exports=route

