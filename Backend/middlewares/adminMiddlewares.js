
class AdminMiddleware{

    // JWT;
    // adminService;
    // bcrypt;
   

    constructor(){
        this.JWT=require('jsonwebtoken')
        this.adminService=require('../services/adminServices');
        this.bcrypt=require('bcrypt')
        

    }

    isUserExistinDb=async (req,res,next)=>{
      
        
        const data=req.body
        const response=await this.adminService.getAdmin({email:data.email});
        
        if (response) {
            return next();
            
        }
        return res.status(401).json({message:'AdminNot exist in Db'})
        


    }

    bcryptCompare=async (req,res,next)=>{
        const body=req.body;
     
        
        const adminObj=await this.adminService.getAdmin({email:body.email});
       
        const enteredPassword=body.password;
        const isPasswordValid=await this.bcrypt.compare(enteredPassword,adminObj.password)
        
        if (isPasswordValid) {
            return next();
            
        }
        return res.status(401).json({message:'Password didn\'t matched'})
    }

    

    createSession=async (req,res,next)=>{

    }
}

const adminMiddleware=new AdminMiddleware();

module.exports=adminMiddleware;