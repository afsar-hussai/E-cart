
const mongoose=require('mongoose');
const mongoUri=process.env.MONGO_URI

const connectDb=async ()=>{
    try {
        await mongoose.connect(mongoUri);
       
       
        

        console.log('Successfully connected to Db');
        
        
    } catch (error) {
        console.log('Error while connecting to Db: ',error);
        
        
    }

}

module.exports=connectDb;


