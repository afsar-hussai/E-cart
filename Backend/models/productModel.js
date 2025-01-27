const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String,required: true,unique: true},
    price :{type: Number,required: true},
    category:{type: String,required: true},
    quantity:{type: Number,required: true},
  
  },{timestamps: true})
  
  //mongoose model
  
  module.exports=mongoose.model('Products',userSchema,'Products');