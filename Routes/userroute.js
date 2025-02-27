const usercontroller=require("../controllers/usercontroller")
const route=require("express").Router()
route.get("/verify/:code",usercontroller.verifyCode)
route.post("/login",usercontroller.login)
route.post("/forget",usercontroller.ForgetPassword)
route.post("/reset/:token",usercontroller.ResetPassword)
route.post("/logout",usercontroller.Logout)
module.exports=route