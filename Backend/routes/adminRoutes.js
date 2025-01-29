const redisMiddlewares=require('../middlewares/redisMiddleware');

const adminMiddleware=require('../middlewares/adminMiddlewares') ;

const express=require('express');
const router=express.Router();

router.post('/login',adminMiddleware.isUserExistinDb,adminMiddleware.bcryptCompare,redisMiddlewares.createSession,(req,res)=>{
    
    const data=req.body;
    console.log("data in Login Routes of admin is: ",data);
    
    res.json({message:'Admin Logged in successfully'})
})
.get('/authenticate',redisMiddlewares.isAuthentic,(req,res)=>{
   
    
    res.json({message:'User is authenticated',data:req.session.user})

})
.get('/logout',redisMiddlewares.logout)

module.exports=router;