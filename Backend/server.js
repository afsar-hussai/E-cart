require('dotenv').config();
const express = require('express')
const cors = require('cors');
const cookieParser=require('cookie-parser')


const connectDb = require('./config/dataBaseConnection');
const authRoutes=require('./routes/authRoutes')
const updateUser=require('./routes/updateUser')


const app = express()
const port = 3000
app.use(express.json())
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))
app.use(cookieParser())

connectDb();



app.use('/auth',authRoutes)
app.use('/profile/update',updateUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})