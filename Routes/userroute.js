const usercontroller=require("../controllers/usercontroller")
const route=require("express").Router()
route.get("/verify/:code",usercontroller.verifyCode)
module.exports=route