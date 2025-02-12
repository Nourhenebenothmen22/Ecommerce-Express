const usermodule=require("../Modules/usermodule")
const { join } = require('path');
module.exports={
    verifyCode:async(req,res)=>{
        try{
            //verification d'email apartir de code
            const verifyUser=await usermodule.findOne({code:req.params.code})
            //supprimmer le code s'il trouve user
            verifyUser.code=undefined
            verifyUser.verify=true
            verifyUser.save()
          return res.sendFile(join(__dirname + "../../template/success.html"));

            
        } catch (error) {
            return res.sendFile(join(__dirname + "../../template/erreur.html"));
            
        }
    }

}