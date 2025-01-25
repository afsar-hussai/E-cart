const authFunctions = require("../util/authFunctions");
const nodemailer = require("nodemailer");
require('dotenv').config()


class UserAuthMiddlewares {
  dbService;
  bcrypt;
  JWT;
  otp={};
  constructor() {
    this.dbService = require("../services/userServices");
    this.bcrypt = require('bcrypt');
    this.JWT = require('jsonwebtoken')

  }

  //userExist Check for registeration, if exist giving error else not
  isUserExistToRegister = async (req, res, next) => {
    const { email } = req.body;


    const isExist = await this.dbService.getUser({ email })


    if (isExist) {
      res.status(400).json({ message: 'User Already Exist Please Login' })

    } else {
      next();
    }

  }

  //userExist Check for login, if not exist giving error else not

  isUserExistToLogin = async (req, res, next) => {


    const { email } = req.body;




    const isExist = await this.dbService.getUser({ email })






    if (isExist) {
      next()

    } else {
      res.status(404).json({ message: 'User Doesn\'t Exist Please Sign Up' })

    }

  }

  //bcrypting

  bcrtpyHash = async (req, res, next) => {
    const data = req.body;
    req.body.password = await this.bcrypt.hash(data.password, 10);
    next()
  }

  //bcrypt compare
  bcryptCompare = async (req, res, next) => {


    const data = req.body;
    
    


    const passwordInDbObj = await this.dbService.getUser({ email: data.email ||  req.user.email });
    
    

    const compareValue = await this.bcrypt.compare(data.password, passwordInDbObj.password);

    if (!compareValue) {
      res.status(404).json({ message: 'Credientials Didn\'t matched' })

    } else {
      next()
    }


  }

  //JWT
  jwtSign = (req, res, next) => {
    const body = req.body;

    const { accessToken, refreshToken } = authFunctions.tokenGenerator({ email: body.email });




    req.body.tokens = { accessToken, refreshToken };
    next();

  }





  jwtVerify = async (req, res, next) => {


    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }

      this.JWT.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json({ message: "Invalid or expired token" });
        }
        
        req.user = user;
        
        next();
      });
    } catch (error) {
      console.error("JWT verification failed:", error);
      res.status(500).json({ message: "Server error during token verification" });
    }
  };








  jwtCookieVerify = (req, res, next) => {


    try {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token not found" });
      }

      this.JWT.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json({ message: "Invalid or expired refresh token" });
        }
        req.body.tokens = authFunctions.tokenGenerator({ email: user.email });
        next();
      });
    } catch (error) {
      console.error("JWT cookie verification failed:", error);
      res.status(500).json({ message: "Server error during token verification" });
    }
  };

  //otp generate middleware
  otpMiddleware=(req,res,next)=>{
    this.otp=authFunctions.otpGenerator();
    console.log("otp object is: ",this.otp);
    
    
    next();
}


  //send OTP Email

  sendOTPEmail = async (req,res,next) => {

    try {
    
    const userEmail=req.user.email;
    console.log("This is user Email in sendOTPEmail middleware: ",userEmail);
    console.log("otp in sendOTPEmail: ",this.otp);
    
    

    //setting transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Email address
        pass: process.env.EMAIL_PASS, // Email password
      },
    })

    console.log("transporter in sendOTPEmail: ",transporter);
    

    const mailOptions = {
      from: `"E-Cart from Ashu Dev 🌺🥦" <${process.env.EMAIL_USER}>`,
      to: userEmail, // Recipient's email
      subject: 'Your OTP Code',
      text: `Your OTP is: ${this.otp.otp} and expires in 5 minutes`, // Plain text body
      html: `<h1>Your OTP is: ${this.otp.otp}</h1>`,
    }

    
      const info=await transporter.sendMail(mailOptions);
      console.log("info is: ",info);
      

      console.log("OTP sent successfully: ",info.messageId);

      
      next();
      
      
    } catch (error) {
      console.error('Error Occured while sending OTP: ',error);
      res.status(400).json({message:'Error in sending mail'});
      throw error;
      
      
    }



  }

  verifyOtp=async (req,res,next)=>{
    const enteredOtp=Number(req.body.otp);
    const sentOtp=this.otp;
    console.log("enteredOtp is: ",enteredOtp);
    console.log("sentOtp is: ",sentOtp);
    
    if (!this.otp) {
      return res.send({valid:false,message:'OTP Not Found'})
      
    }

    const {otp,expiry}=sentOtp;

    if (Date.now()>expiry) {
      delete this.otp.otp;
      delete this.otp.expiry;
      return res.json({valid:false,message:'OTP Expired'})
      
    }

    if (enteredOtp===otp) {
      delete this.otp.otp;
      delete this.otp.expiry;
      return next()
      
    }
    return res.json({valid:false,message:'Invalid OTP'});


  }





}

const authMiddlewares = new UserAuthMiddlewares();

module.exports = authMiddlewares