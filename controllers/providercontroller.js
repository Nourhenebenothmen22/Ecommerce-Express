
const ProviderModule = require("../Modules/providermodule")
const nodemailer = require('nodemailer');
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
            const provider=await ProviderModule(req.body)
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
                html:'<h1>hello world</h1>'
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
                const provider=await providermodule.find()
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
getProviderByid:async(req,res)=>{
    const id=req.params.id
    try {
        const getprovider=await providermodule.findById(id)
        res.status(200).json({
            success:true,
            message:"liste provider",
            data:getprovider
        })

    } catch (error) {
        res.status(400).json({
            success:false,
            message:"provider is  not listed"+error,
            data:null

        })
         
        
    }
},
deleteprovider:async(req,res)=>{
    const id=req.params.id
    try {
        const deleteprov= await providermodule.findByIdAndDelete(id)
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
        const updateprov=await providermodule.findByIdAndUpdate(id,req.body,{new:true})
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