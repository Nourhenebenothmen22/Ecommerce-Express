const orderController=require("../controllers/orderController")
const route=require("express").Router()
route.post("/add",orderController.createOrder)
route.get("/get",orderController.listeOrder)
route.delete("/delete/:id",orderController.deleteOrder)
route.put("/update/:id",orderController.updateOrder)
route.get("/get/:id",orderController.getOrderByid)
module.exports=route