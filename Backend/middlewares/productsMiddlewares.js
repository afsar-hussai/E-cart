const multer = require('multer');
const path = require('path');
const fs = require('fs');
class ProductsMiddlewares{

    constructor(){

        const uploadDir = path.join(__dirname, '../uploads');
      
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const storage=multer.diskStorage({
            destination:(req,file,cb)=>{
                cb(null,uploadDir)
            },
            filename:(req,file,cb)=>{
                cb(null,file.originalname)
            }
        })

        this.uploadImage=multer({storage:storage}).array('files',5);
       
        

    }
  
}

const productsMiddlewares=new ProductsMiddlewares();;
module.exports=productsMiddlewares;