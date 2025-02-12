const orderModule = require("../Modules/orderModule")
module.exports={
    createOrder:async(req,res)=>{
        
         try {
            const order=await orderModule(req.body)
            await order.save()
            res.status(200).json({
                success:true,
                message:"order is created",
                data:order
            })

            
         } catch (error) {
            res.status(400).json({
                success:false,
                message:"order is not  created"+error,
                data:null
            })

            
         }
    },
    listeOrder:async(req,res)=>{
        try {
            const order=await orderModule.find()
            res.status(200).json({
                success:true,
                message:"order is listed",
                data:order
            })
           
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"order is not listed",
                data:null
            })
            
        }
    },
    deleteOrder:async(req,res)=>{
        const id=req.params.id
        try {
            const deleteOrder=await orderModule.findByIdAndDelete(id)
            res.status(200).json({
                success:true,
                message:'order is  deleted ',
                data:deleteOrder
    
            })

        } catch (error) {
            res.status(400).json({
                success:false,
                message:"order not deleted" +error,
                data:null
            })

            
        }
    },
    updateOrder:async(req,res)=>{
        const id=req.params.id
        try {
            const UpdateOrd=await orderModule.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json({
                success:true,
                message:'order is  updated',
                data:UpdateOrd
    
            })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:'order is not updated'+error,
                data:null
            })
            
        }
    },
    getOrderByid:async(req,res)=>{
        const id=req.params.id
        try {
            const getOrd=await orderModule.findById(id)
            res.status(200).json({
                success:true,
                message:"order is listed",
                data:getOrd
        
                })
            
        } catch (error) {
            res.status(200).json({
                success:false,
                message:"order is not listed",
                data:null
        
                })
            
        }
    }
    
        
       
            
        
    
}