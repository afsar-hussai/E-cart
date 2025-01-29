const {RedisStore}=require('connect-redis');
const redis=require('redis');
const session=require('express-session');
class RedisMiddlewares{
    constructor(){
        this.RedisClient=null;
        this.sessionMddleware=null;

        
        
        
    }
    //constructor ends here

    //initialization

    init=async ()=>{

        this.RedisClient=redis.createClient({
            host:'127.0.0.1',
            port:6379
        });
        //check here once
        await this.RedisClient.connect().catch(err=>console.log('error in connecting',err));

        // Handle Redis connection events
        this.RedisClient.on('connect', () => {
            console.log('Redis client connected');
        });

        this.RedisClient.on('error', (err) => {
            console.error('Redis error:', err);
        });

        this.sessionMddleware=session({
            store:new RedisStore({client:this.RedisClient}),
            secret:process.env.SESSION_SECRET||'secret',
            resave:false,
            saveUninitialized:false,
            cookie:{
                secure:process.env.NODE_ENV === 'production',
                httpOnly:true,
                maxAge:1000*60*60*24 //1 day *60*24
            }
        })

        

    }

    
  

    //login
    createSession=(req,res,next)=>{
  
            req.session.user=req.body.email;
            next();
    }

    //is authentic to access a route

    isAuthentic=(req,res,next)=>{
        if(req.session.user){
            return next();
        }else{
            return res.status(404).send('Unauthorized');
        }
     }
     //logout session

     logout=(req,res,next)=>{
         req.session.destroy(err=>{
            if (err) {
                console.log("error in destroying session",err);
                return res.status(500).send('Internal Server Error');
               
            }
            res.clearCookie('connect.sid');
            return res.status(200).send('Logged out successfully');
         })
     }


}
const redisMiddlewares=new RedisMiddlewares();
module.exports=redisMiddlewares;