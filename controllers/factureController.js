const CommandeModule = require("../Modules/CommandeModule")
const factureModule=require("../Modules/factureModule")
module.exports={
    createfacture:async(req,res)=>{
        try {
            const facture=await factureModule(req.body)
                       await facture.save()
                       await CommandeModule.findByIdAndUpdate({_id:req.body.commande},{$push:
                        {facture:facture}
                       })
                       res.status(200).json({
                           success:true,
                           message:"facture is created",
                           data:facture
                       })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"facture is not created"+error,
                data:null
            })
            
        }
    },
    deleteFacture:async(req,res)=>{
     const id=req.params.id
     try {
        const deleteFact=await factureModule.findByIdAndDelete(id)
        await CommandeModule.updateMany({facture:id},{$pull:
            {facture:id}
           })
        res.status(200).json({
            success:true,
            message:"facture is deleted",
            data:deleteFact

        })
        
     } catch (error) {
        res.status(400).json({
            success:false,
            message:"facture is not  deleted"+error,
            data:null

        })
        
     }
    },
    getFactureById:async(req,res)=>{
        const id=req.params.id
        try {
            const getfacture=await factureModule.findById(id)
            res.status(200).json({
                success:true,
                message:"facture is listed",
                data:getfacture
    
            })
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"facture is not  listed",
                data:null
    
            })
            
        }
    },getFacture:async(req,res)=>{
       
try {
    const getfact=await factureModule.find()
        res.status(200).json({
            success:true,
            message:"facture is listed",
            data:getfact

        })
} catch (error) {
    res.status(400).json({
        success:true,
        message:"facture is not  listed",
        data:null

    })
    
}
    },
     Updatefacture:async(req,res)=>{
            const id=req.params.id
          try {
            const updatefact=await factureModule.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json({
                success:true,
                message:"facture  is updated",
                data:updatefact
            })
          } catch (error) {
            res.status(400).json({
                success:false,
                message:"facture is not updated"+error,
                data:null
            })
            
          }
        }
}