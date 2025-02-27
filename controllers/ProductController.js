const ProductModel= require("../Modules/ProductModule")
const providerModel=require("../Modules/providermodule")
const subcategorieModel=require("../Modules/subcategoriemodule")
module.exports={
    createProduct:async(req,res)=>{
       try {
       if(req.files){
        req.body["galleries"]=req.files.length<=0 ? []: req.files.map((file)=>({
            image:file.filename

        }))
       }
        const product=await ProductModel(req.body)
        await product.save()
        await providerModel.findByIdAndUpdate({_id:req.body.provider},{$push:{
            products:product._id

        }})
        await subcategorieModel.findByIdAndUpdate({_id:req.body.subcategorie},{$push:{
            products:product._id

        }})
        res.status(200).json({
            success:true,
            message:'product is created',
            data:product
        })


        
       } catch (error) {
        res.status(400).json({
            success:false,
            message:'product not created'+error,
            data:null
        })
        
       }
                


    },listProduct:async(req,res)=>{
        try {
            const products=await ProductModel.find()
           res.status(200).json({
            success:true,
            message:'element is listed',
            data:products

           })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:'element is not listed'+error,
                data:null
            })
            
        }
    },
    updateproduct:async(req,res)=>{
       
        try {
            const id=req.params.id
            const existingProduct = await ProductModel.findById(id);
            if (!existingProduct) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found",
                    data: null
                });
            }
            // Vérifier si des fichiers ont été envoyés
            if (req.files.length > 0) {
                // Ajouter les nouvelles images à la galerie existante
                req.body["galleries"] = [
                    ...existingProduct.galleries, // Conserver les anciennes images
                    ...req.files.map((file) => ({ image: file.filename })) // Ajouter les nouvelles
                ];
            } else {
                // Ne pas modifier la galerie si aucune nouvelle image n'est envoyée
                req.body["galleries"] = existingProduct.galleries;
            }
            const updaprod=await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json({
                success:true,
                message:"product is updated",
                data:updaprod
            })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"product is not updated"+error,
                data:null
            })
            
        }
    },
    listProductById:async(req,res)=>{
        const id=req.params.id
        try {
            const products=await ProductModel.findById(id)
           res.status(200).json({
            success:true,
            message:'product is listed',
            data:products

           })
            
        } catch (error) {
            res.status(400).json({
                success:false,
                message:'product is not listed'+error,
                data:null
            })
            
        }
    },
    deleteproduct:async(req,res)=>{
        const id=req.params.id
        try {
            const deleteprod= await ProductModel.findByIdAndDelete(id)
            res.status(200).json({
                success:true,
                message:"product is deleted",
                data:deleteprod
            })
    
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"product is not deleted"+error,
                data:null
            })
            
        }
    }


}