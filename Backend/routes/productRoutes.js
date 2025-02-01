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



module.exports=router;