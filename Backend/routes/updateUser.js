const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/userAuthMiddlewares');
const dbService = require('../services/userServices');


router.post('/oldPassword', authMiddlewares.jwtVerify, authMiddlewares.bcryptCompare, (req, res) => {
    res.json({ message: 'Old Password verified Successfully' })

})
    .get('/otp', authMiddlewares.jwtVerify, authMiddlewares.otpMiddleware, authMiddlewares.sendOTPEmail, (req, res) => {
        res.json({ message: 'Otp Sent successfully' })


    })
    .post('/verify-otp', authMiddlewares.verifyOtp, (req, res) => {
        res.json({ valid: true, message: 'OTP Verified' })

    })
    .post('/newupdate', authMiddlewares.jwtVerify, authMiddlewares.bcrtpyHash, async (req, res) => {
        
        const email = req.user.email;
        const body = req.body;
        console.log("body and email in newupdate is: ",body,email);
        // console.log("dbService.updateUser",await dbService.updateUser(email,{password: body.password}));
        
        

        try {
            const newUpdatedDoc = await dbService.updateUser(email, 
                {
                password: body.password
            }
            )
    
            if (!newUpdatedDoc) {
                return res.json({message:'newPassword is missing'})
                
            }
            console.log("new updated doc is: ",newUpdatedDoc);
            

            res.json({message:'Successfully updated new password'})
            
        } catch (error) {
            return res.json({message:'can\'t update '})
            
        }
        


    })

module.exports = router;