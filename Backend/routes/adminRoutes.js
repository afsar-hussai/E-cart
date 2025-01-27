const adminMiddleware=require('../middlewares/adminMiddlewares') ;

const express=require('express');
const router=express.Router();

router.post('/login',adminMiddleware.isUserExistinDb,adminMiddleware.bcryptCompare,(req,res)=>{
    const data=req.body;
    console.log("data in Login Routes of admin is: ",data);
    
    res.json({message:'Admin Logged in successfully'})
})

module.exports=router;