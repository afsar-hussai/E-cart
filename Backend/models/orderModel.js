const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required: true
    },
    items:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Products'

            },
            quantity:Number
        }
    ],
    totalAmount: Number,
    orderStatus: {
        type: String,
        enum:["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },
    paymentStatus:{
        type: String,
        enum:['Pending', 'Paid', 'Failed'],
        default:'Pending'
    }
  
  },{timestamps: true})
  
  //mongoose model
  
  module.exports=mongoose.model('Orders',orderSchema,'Orders');