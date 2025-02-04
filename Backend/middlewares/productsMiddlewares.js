const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig')

class ProductsMiddlewares {

    constructor() {

        const uploadDir = path.join(__dirname, '../uploads');



        const storage = new CloudinaryStorage({
            cloudinary: cloudinary,
            params: {
                folder: 'uploads',
                format: async (req, file) => file.mimetype.split('/')[1],
                public_id: (req, file) => `${file.originalname.split(".")[0]}-${Date.now()}`
            }
        })


        this.uploadImage = multer({

            storage: storage,
            
            fileFilter: (req, file, cb) => {
                const allowedFilesTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
                if (allowedFilesTypes.includes(file.mimetype)) {
                    cb(null, true)

                } else {
                    cb(new Error('Not a correct file type'), false)
                }
            }

        }).array('files', 5);



    }

}

const productsMiddlewares = new ProductsMiddlewares();;
module.exports = productsMiddlewares;