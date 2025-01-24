const express = require('express');
const dbService = require('../services/userServices');

const authMiddlewares = require('../middlewares/userAuthMiddlewares');
const router = express.Router();





router.post('/login', authMiddlewares.isUserExistToLogin, authMiddlewares.bcryptCompare,authMiddlewares.jwtSign, (req, res) => {
  const data = req.body;
  
  const tokens=data.tokens;
  
  

  res.cookie('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: true, // Only over HTTPS
    sameSite: 'Strict', // Prevent CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })

  res.json({ message: 'Data Received successfully for login',token:tokens.accessToken })
})
  .post('/register', authMiddlewares.isUserExistToRegister, authMiddlewares.bcrtpyHash, authMiddlewares.jwtSign, async (req, res) => {
    const data = req.body;
    const accessToken = data.tokens.accessToken;
    const refreshToken = data.tokens.refreshToken;
    Reflect.deleteProperty(data, 'tokens');


    
    dbService.createUser(data);
    
    

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: 'Strict', // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ message: 'Data Received successfully for signup', token: accessToken })
  })
  .get('/revoke-token',authMiddlewares.jwtCookieVerify,(req,res)=>{

    const data = req.body;
    const accessToken = data.tokens.accessToken;
    const newRefreshToken = data.tokens.refreshToken;
    Reflect.deleteProperty(data, 'tokens');

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true, // Only over HTTPS
      sameSite: 'Strict', // Prevent CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.json({ message: 'Data Received successfully for signup', token: accessToken })




  })
  .get('/profile',authMiddlewares.jwtVerify,(req,res)=>{
    res.json({message:'Successfully token verified',email:req.user.email})

  })

module.exports = router