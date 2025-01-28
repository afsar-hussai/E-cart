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
                maxAge:1000*60*60*24
            }
        })

        

    }

    
  

    //login
    createSession=async (req,res,next)=>{
        
        
        if (!req.session.user) {
            req.session.user=req.body.email;
            next();
        }

    }
}
const redisMiddlewares=new RedisMiddlewares();
module.exports=redisMiddlewares;