class AuthFunctions{
    tokenGenerator;
    JWT;
    constructor(){
        this.JWT=require('jsonwebtoken');
        

    }

    tokenGenerator=({email})=>{
        const accessToken=this.JWT.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        const refreshToken=this.JWT.sign({email},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})

        return {accessToken,refreshToken}
    }

    otpGenerator=()=>{
        return Math.floor(10000+Math.random()*900000)
    }
}

const authFunctions=new AuthFunctions();

module.exports=authFunctions