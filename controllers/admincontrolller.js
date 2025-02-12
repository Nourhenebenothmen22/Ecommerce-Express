const adminmodule=require("../Modules/adminmodule")
const nodemailer = require('nodemailer');
const {randomBytes} = require("crypto");
const generateCode = randomBytes(6).toString("hex");
// Create a transporter object
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
    createadmin:async(req,res)=>{
        try {
            const admin=await adminmodule({...req.body,code:generateCode})
            const savedadmin= await admin.save()
            res.status(200).json({
                success:true,
                message: "admin created",
                data:savedadmin
            })
            const mailOptions = {
                from: 'yourusername@email.com',
                to: savedadmin.email,
                subject: 'hello' +savedadmin.fullname,
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
                <a href ="http://localhost:3000/user/verify/${savedadmin.code}"> click here </a>
            </body>
            </html>`
              };
              transporter.sendMail(mailOptions
                
              );


            
        } catch (error) {
            res.status(400).json({
                success:false,
                message: "admin not created created",
                data:null
            })
            
        }
    },
    listeadmin:async(req,res)=>{
        try {
             const admin=await adminmodule.find()
                            res.status(200).json({
                                success:true,
                                message:"liste admin",
                                data:admin
                            })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"admin is not listed",
                data:null
            })
        }
    },
     Updateadmin:async(req,res)=>{
            const id=req.params.id
          try {
            const updateadmin=await adminmodule.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json({
                success:true,
                message:"admin is updated",
                data:updateadmin
            })
          } catch (error) {
            res.status(400).json({
                success:false,
                message:"admin is not updated",
                data:null
            })
            
          }
        },
        getadminById:async(req,res)=>{
                const id=req.params.id
                try {
                    const getadmin=await adminmodule.findById(id)
                    res.status(200).json({
                        success:true,
                        message:"element is listed",
                        date:getadmin
                    })
                } catch (error) {
                    res.status(400).json({
                        success:false,
                        message:'element is not listed',
                        data:null
                    })
                    
             

}
        },
         Deleteadmin:async(req,res)=>{
                const id=req.params.id
                try {
                    const deleteadmin=await adminmodule.findByIdAndDelete(id)
                    res.status(200).json({
                        success:true,
                        message:"admin is deleted",
                        data:deleteadmin
                    })
                } catch (error) {
                res.status(400).json({
                    success:false,
                    message:'admin is not deleted'+error,
                    data:null
                })
        
                    
                }
            }

    }