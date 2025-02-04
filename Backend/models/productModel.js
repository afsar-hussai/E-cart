const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    title: {type: String,required: true},
    description: {type: String,required: true,unique: true},
    price :{type: Number,required: true},
    category:{type: String,required: true},
    quantity:{type: Number,required: true},
    imageUrl:[{type:String,default:""}],
    imageId:[{type:String,default:""}]
  
  },{timestamps: true})
  
  //mongoose model
  
  module.exports=mongoose.model('Products',productSchema,'Products');