const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    password :{type: String,required: true},
    phone:{type: String,required: true},
    role:{type: String,required: true},
  
  },{timestamps: true})
  
  //mongoose model
  
  module.exports=mongoose.model('Admins',userSchema,'Admins');