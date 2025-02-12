const customermodule=require("../Modules/customermodule")
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
   CreateCustomer:async(req,res)=>{

  try {
   if (req.file){
    req.body.picture=req.file.filename
   }
    const customer=await customermodule(req.body)
    const savedcustomer= await customer.save()
    res.status(200).json({
        success:true,
        message:"customer is created",
        data:savedcustomer
    })
    const mailOptions = {
        from: 'yourusername@email.com',
        to: savedcustomer.email,
        subject: 'hello' +savedcustomer.fullname,
        text: 'mail de confirmation',
        html:'<h1>hello world</h1>'
      };
      transporter.sendMail(mailOptions
        
      );


         
} catch (error) {
    res.status(400).json({
        success:false,
        message:"customer is not created",
        data:null
    })

    
}
   },listecustomer:async(req,res)=>{
    try {
        const customer=await customermodule.find()
        res.status(200).json({
            success:true,
            message:'customer is listed',
            data:customer
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'customer is not listed',
            data:null
        })
        
    }
   },
   deleteCustomer:async(req,res)=>{
    const id=req.params.id
    try {
        const deleteCust=await customermodule.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'customer deleted',
            data:deleteCust
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'customer is not deleted',
            data:null
        })
        
    }
    
   },
   listebyid:async(req,res)=>{
    const id=req.params.id
    try {
        const listebyidcust=await customermodule.findById(id)
        res.status(200).json({
            success:true,
            message:'customer is listed',
            data:listebyidcust
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'customer is not listed',
            data:null
        })
        
    }
   },
   updateCustomer:async(req,res)=>{
       
    try {
        const id=req.params.id
        if(req.file)
            {req.body.picture=req.file.filename};
        const updateCust=await customermodule.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            success:true,
            message:'categorie is updated ',
            data:updateCust
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'categorie is not updated '+error,
            data:null
        })
        
    }
   }


}