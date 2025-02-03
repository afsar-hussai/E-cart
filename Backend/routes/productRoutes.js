const productsMiddlewares=require('../middlewares/productsMiddlewares');

const express=require('express');
const router=express.Router();
const productsDbService=require('../services/adminServices');


router.post('/create',async (req,res)=>{
    const data=req.body;
   
    
    const response=await productsDbService.createProduct(data);
    
    if (response) {
        return res.json({message:'Successfully Product Uploaded'})
        
    }
    return res.status(500).json({message:'unable to upload'})
    

})
.post('/image',productsMiddlewares.uploadImage,async (req,res)=>{
    const files=req.files;
    
    

    if (!files || files.length===0) {
        return res.json({message:'No file Uploaded'})
        
    }
    const filePaths=files.map(file=>({
        filename:file.filename,
        path:`/uploads/${file.filename}`
    }))
   res.json({message:'Successfully Uploaded',file:filePaths})
   
    
    
})



module.exports=router;