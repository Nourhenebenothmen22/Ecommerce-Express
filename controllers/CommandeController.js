const CommandeModule=require("../Modules/CommandeModule")
const customerModule=require("../Modules/customermodule")
    module.exports={
     createCommande:async(req,res)=>{
            try {
                const commande=await CommandeModule(req.body)
                           await commande.save()
                           await customerModule.findByIdAndUpdate({_id:req.body.customer},{$push:{
                            commandes:commande._id
                           
                                   }})
                           res.status(200).json({
                               success:true,
                               message:"commande is created",
                               data:commande
                           })
                
            } catch (error) {
                res.status(400).json({
                    success:false,
                    message:"commande is not created"+error,
                    data:null
                })
                
            }
        },
         Deletecommande:async(req,res)=>{
                const id=req.params.id
                try {
                    const deletecomm=await CommandeModule.findByIdAndDelete(id)
                    res.status(200).json({
                        success:true,
                        message:"commande is deleted",
                        data:deletecomm
                    })
                } catch (error) {
                res.status(400).json({
                    success:false,
                    message:'commande is not deleted'+error,
                    data:null
                })
        
                    
                }
            },
            listeCommandeByid:async(req,res)=>{
                const id=req.params.id
                try {
                    const listecomm=await CommandeModule.findById(id)
                    res.status(200).json({
                        success:true,
                        message:"commande is listed",
                        data:listecomm
                    })
                } catch (error) {
                res.status(400).json({
                    success:false,
                    message:'commande is not listed'+error,
                    data:null
                })
        
                    
                }
            },
            listecommande:async(req,res)=>{
                try {
                    const commande=await CommandeModule.find()
                    res.status(200).json({
                        success:true,
                        message:"liste commande",
                        data:commande
                    })
                } catch (error) {
                    res.status(400).json({
                        success:false,
                        message:"commande is  not listed",
                        data:null
        
                    })
                     
                    
                    
                }
    
    },
    Updateprovider:async(req,res)=>{
        const id=req.params.id
      try {
        const updatecomm=await CommandeModule.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            success:true,
            message:"commande is updated",
            data:updatecomm
        })
      } catch (error) {
        res.status(400).json({
            success:false,
            message:"commande is not updated",
            data:null
        })
        
      }
    }




        
}