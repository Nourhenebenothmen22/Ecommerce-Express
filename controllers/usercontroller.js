const usermodule=require("../Modules/usermodule")
const { join } = require('path');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer');
const { error } = require("console");
const accessKey = process.env.rtoken
const refreshKey = process.env.ftoken
const generateAccessToken = (user)=>{
    return jwt.sign({id:user.id},accessKey,{expiresIn:"10m"})
}
const generateRefreshToken = (user)=> {
    return jwt.sign({id:user.id},refreshKey,{expiresIn:"1h"})
}
const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false, // use SSL
    auth: {
      user: '42c2640dbbb26a',
      pass: 'd667870a7333e5',
    }
  });
let refreshTokens = []

module.exports={
    verifyCode:async (req, res) => {
        try {
            const verifyCode = await usermodule.findOne({ code: req.params.code });
        if (!verifyCode) {
                return res.sendFile(join(__dirname + "../../template/erreur.html"));
            }
          // Mise à jour sans déclencher `pre("save")`
            await usermodule.updateOne(
                { _id: verifyCode._id },
                { $unset: { code: "" }, $set: { verify: true } }
            );
            return res.sendFile(join(__dirname + "../../template/success.html"));
        } catch (err) {
            return res.sendFile(join(__dirname + "../../template/erreur.html"));
        }
    },
    login : async (req,res) => {
        try {
            const {email,password} = req.body
            const user = await usermodule.findOne({email})
            if (!user){
                res.status(400).json({
                    message:"email doesnt exist"
                })
            }
            else {
            const pass = await bcrypt.compare(password,user.password)
            if (!pass){
                res.status(400).json({
                    message:"wrong password"
                })
            }
            else {
                const accessToken = generateAccessToken(user)
                const refreshToken = generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.status(200).json({
                    success:true,
                    message:"correct email and password",
                    data:user,
                    accessToken:accessToken,
                    refreshToken:refreshToken
                })
            }
            }
        }
        catch (err){
            res.status(400).json({
                success:false,
                message:"email wrong or doesnt exist "+err
            })
        }
    },
    ForgetPassword:async(req,res)=>{
        try {
            const {email}=req.body 
            const user=await usermodule.findOne({email})
            if(!user) {
                res.status(400).json({
                    message:'email incorrect',
                    data:null
                })
                
            }
            else{
                const generateAccessToken=jwt.sign({id:user.id},accessKey,{expiresIn:"5m"})
                await usermodule.findOneAndUpdate({email},{token:generateAccessToken},{new:true})
                const mailOptions = {
                    from: 'yourusername@email.com',
                    to: user.email,
                    subject:'forget password',
                    text: 'changement de motpass',
                    html:`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <b> clic here to take your token</b>,<a href=http://localhost:3000/${generateAccessToken}>clic</a>
                </body>
                </html>`
                  };
                  transporter.sendMail(mailOptions
                    
                  );
                  res.status(200).json({
                    success:true,
                    message:'Send email',
                    data:user
                  })

            }
        } 
            catch (error) {
                res.status(400).json({
                    success:false,
                    message:'Send not email'+error,
                    data:null
                  })
            
        }
    },
    ResetPassword:async (req,res)=> {
        try {
            const token=req.params.token
            const VerifyToken=await jwt.verify(token,accessKey,async(error)=>{
                if(error){
                    res.status(400).json({
                        success:false,
                        message:'failed to verify ',
                        data:null


                    })
                }
               const user=await usermodule.findOne({token})
               const newpassword=await req.body.password
               user.password=newpassword
               user.token=undefined
               user.save()
               res.status(200).json({
                success:true,
                message:'password changed ',
                data:user


               })

            })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:'failed to change your password '+error,
                data:null
            })
            
        }
        
    },
    Logout:async(req,res)=>{
        const refreshToken=req.body.token
        refreshTokens=refreshTokens.filter((token)=>{
            token!==refreshToken
        })
        res.status(200).json({
            message:'Déconnexion réussit'
        })
    }

}
    
    
    
    
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    

