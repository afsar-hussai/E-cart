const orderServices=require('../services/orderServices');

const express=require('express');
const router=express.Router();

router.post('/create',async (req,res)=>{
    const data=req.body;
    console.log("Created order data is: ",data);
    

    try {
        const response=await orderServices.createOrder(data);
        if (response) {
            res.status(200).json({message:'Order Created successfully'})
            
        }
        
    } catch (error) {
        console.log("Error in order create route",error);
        throw error;
        
    }
})
.get('/getallOrders',async (req,res)=>{

    try {
        const allUsers=await orderServices.getAllOrders();
        
        if (allUsers) {
            res.status(200).json({orders:allUsers});
            
        }
        
        
    } catch (error) {
        console.log("Error occured in getting all orders: ",error);
        throw error;
        
        
    }
})
.patch('/updateorderstatus/:id',async (req,res)=>{
    const orderId=req.params.id;
    
    
    const orderStatus=req.body;
   
    
    try {
        const newupdatedDocument=await orderServices.updateOrders(orderId,orderStatus);
        
        if (newupdatedDocument) {
           return res.status(200).json({message:`Order status updated to '${orderStatus?.orderStatus}' and payment status is: '${newupdatedDocument?.paymentStatus}'`})
            
        }
        return res.status(404).json({message:"can't update"})
        
    } catch (error) {
        console.log("Error occured in updateorderstatus: ",error);
        throw error;
    }
})


module.exports=router;