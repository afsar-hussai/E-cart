const express=require('express');
const router=express.Router();
const authMiddlewares=require('../middlewares/userAuthMiddlewares');
const dbService=require('../services/userServices');
const authFunctions=require('../util/authFunctions');

router.post('oldPassword',authMiddlewares.jwtVerify,authMiddlewares.bcryptCompare,(req,res)=>{
    res.json({message:'Old Password verified Successfully'})

})
.get('otp',authMiddlewares.otpMiddleware,authMiddlewares.jwtVerify,authMiddlewares.sendOTPEmail,(req,res)=>{
    res.json({message:'Otp Sent successfully'})
    

})
.post('verify-otp',(req,res)=>{

})

module.exports=router;