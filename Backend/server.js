const redisMiddlewares=require('./middlewares/redisMiddleware');

require('dotenv').config();
const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser')


const connectDb = require('./config/dataBaseConnection');
const authRoutes = require('./routes/authRoutes')
const updateUser = require('./routes/updateUser')
const adminRoutes = require('./routes/adminRoutes')


const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())


connectDb();

(async () => {

  try {
    await redisMiddlewares.init();
    app.use(redisMiddlewares.sessionMddleware);
    app.use('/auth', authRoutes)
    app.use('/profile/update', updateUser)
    app.use('/admin', adminRoutes)
  
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
    
  } catch (error) {
    console.error('Error during app initialization:', error);
    process.exit(1);
    
  }
 


})()



