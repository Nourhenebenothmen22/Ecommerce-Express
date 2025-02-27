
const ProviderModule = require("../Modules/providermodule")
const nodemailer = require('nodemailer');
const {randomBytes} = require("crypto");
const generateCode = randomBytes(6).toString("hex");
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false, // use SSL
    auth: {
      user: '42c2640dbbb26a',
      pass: 'd667870a7333e5',
    }
  });
module.exports={
    Createprovider:async(req,res)=>{
        try {
            const provider=await ProviderModule({...req.body,code:generateCode})
           const savedprovider= await provider.save()
            res.status(200).json({
                success:true,
                message:"provider created",
                data:savedprovider
            }) 
            const mailOptions = {
                from: 'yourusername@email.com',
                to: savedprovider.email,
                subject: 'hello' + '' +savedprovider.fullname,
                text: 'mail de confirmation',
                html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>verify account</h1>
                <a href ="http://localhost:3000/user/verify/${savedprovider.code}"> click here </a>
            </body>
            </html>`
              };
              transporter.sendMail(mailOptions
                
              );

            
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"provider not created created"+error,
                data:null
            }) 
            
        }

    },
     listeProvider:async(req,res)=>{
            try {
                const provider=await ProviderModule.find()
                res.status(200).json({
                    success:true,
                    message:"liste provider",
                    data:provider
                })
            } catch (error) {
                res.status(400).json({
                    success:false,
                    message:"provider is  not listed",
                    data:null
    
                })
                 
                
                
            }

},
getproviderById : async (req,res) => {
    try {
        const providerId = req.params.id;
        const provider = await ProviderModule.findById(providerId)
        if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
        data: null,
      });
    }
        res.status(200).json({
            success:true,
            message:"provider found",
            data:provider
        })
    }
    catch(error) {
        console.error("Erreur lors de la recherche de fournisseur :", error);
        res.status(500).json({
            success:false,
            message:"Erreur interne du serveur",
            data:null
        })
}
},

deleteprovider:async(req,res)=>{
    const id=req.params.id
    try {
        const deleteprov= await ProviderModule.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:"liste is deleted",
            data:deleteprov
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:"liste is not deleted",
            data:null
        })
        
    }
},
Updateprovider:async(req,res)=>{
        const id=req.params.id
      try {
        const updateprov=await ProviderModule.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            success:true,
            message:"provider is updated",
            data:updateprov
        })
      } catch (error) {
        res.status(400).json({
            success:false,
            message:"provider is not updated",
            data:null
        })
        
      }
    }

}