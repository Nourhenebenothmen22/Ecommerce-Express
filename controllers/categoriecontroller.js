const categorieModel=require('../Modules/categoriemodule')
module.exports={
   createCategorie:async(req,res)=>{
    try {
        const categorie=await categorieModel(req.body)
        await categorie.save()
        res.status(200).json({
            success:true,
            message:'categorie created',
            data:categorie
        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'categorie not created',
            data:null
        })
        
    }
   },listeCategorie:async(req,res)=>{
    try {
        const categorie=await categorieModel.find()
        res.status(200).json({
            success:true,
            message:'categorie listed',
            data:categorie

        })

        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'categorie listed',
            data:categorie
        })
           

        
    }
   },
   DeleteCategorie:async(req,res)=>{
    const id=req.params.id
    try {
        const Deletecateg=await categorieModel.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'categorie  deleted ',
            data:Deletecateg

        })
       

        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"categ not deleted" +error,
            data:null
        })
        
    }

   },
   UpdateCategorie:async(req,res)=>{
    const id=req.params.id
    try {
        const UpdateCateg=await categorieModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            success:true,
            message:'categorie updated',
            data:UpdateCateg

        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:'categorie not updated'+error,
            data:null
        })
    }

   },
   getCategoriebyid:async (req,res)=> {
    const id=req.params.id
    try {
        const getcateg=await categorieModel.findById(id)
        res.status(200).json({
        success:true,
        message:"element listed",
        data:getcateg

        })
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:"element not listed"+error,
            data:null
    
            })
        
    }
    
   }


}