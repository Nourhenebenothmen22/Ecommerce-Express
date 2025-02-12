const subcategorieModel=require("../Modules/subcategoriemodule")
module.exports={
    createSubcategorie:async(req,res)=>{
        try {
           const subcategorie=await subcategorieModel(req.body)
           await subcategorie.save()
           res.status(200).json({
            success:true,
            message:"subcategorie crated",
            data:subcategorie
           })
           
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"subcategorie not created",
                data:null
            })
            
        }

    },
    listesubcategorie:async(req,res)=>{
        try {
            const subcategorie=await subcategorieModel.find()
            res.status(200).json({
                success:true,
                message:"liste categorie",
                data:subcategorie
            })
        } catch (error) {
            res.status(400).json({
                success:false,
                message:"subcategorie not listed",
                data:null

            })
             
            
            
        }

    },
    Deletesubcategorie:async(req,res)=>{
        const id=req.params.id
        try {
            const deletesubcateg=await subcategorieModel.findByIdAndDelete(id)
            res.status(200).json({
                success:true,
                message:"subcategorie is deleted",
                data:deletesubcateg
            })
        } catch (error) {
        res.status(400).json({
            success:false,
            message:'subcategorie is not deleted'+error,
            data:null
        })

            
        }
    },
    UpdatesubCategorie:async(req,res)=>{
        const id=req.params.id
      try {
        const updatesubcateg=await subcategorieModel.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({
            success:true,
            message:"subcategorie is updated",
            data:updatesubcateg
        })
      } catch (error) {
        res.status(400).json({
            success:false,
            message:"subcategorie is not updated",
            data:null
        })
        
      }
    },
    getSubcategorieById:async(req,res)=>{
        const id=req.params.id
        try {
            const getsubcateg=await subcategorieModel.findById(id)
            res.status(200).json({
                success:true,
                message:"element is listed",
                date:getsubcateg
            })
        } catch (error) {
            res.status(400).json({
                success:false,
                message:'element is not listed',
                data:null
            })
            
        }
    }
}