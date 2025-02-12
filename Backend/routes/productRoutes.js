const productsMiddlewares = require('../middlewares/productsMiddlewares');

const express = require('express');
const router = express.Router();
const productsDbService = require('../services/adminServices');
const cloudinary = require('../config/cloudinaryConfig')


router.post('/create', async (req, res) => {
    const data = req.body;


    const response = await productsDbService.createProduct(data);
    // console.log("response in create is: ",response);


    if (response) {
        return res.json({ message: 'Successfully Product Uploaded', product: response })

    }
    return res.status(500).json({ message: 'unable to upload' })


})
    .post('/image/:productId', productsMiddlewares.uploadImage, async (req, res) => {
        const files = req.files;
        const { productId } = req.params;
        const pathLinks = [];
        const imageNames = [];
        // console.log("files are: ",files);
        // console.log("paths in file are: ",files[0].path);
        console.log("productId is: ", productId);


        if (!files || files.length === 0) {
            return res.json({ message: 'No file Uploaded' })

        }


        files.forEach(element => {
            pathLinks.push(element.path);
            imageNames.push(element.filename);

        });


        const updateDbWithPathLink = await productsDbService.updateProduct(productId, pathLinks, imageNames);



        const filePaths = files.map(file => ({
            filename: file.filename,
            path: file.path
        }))
        res.json({ message: 'Successfully Uploaded', file: filePaths })



    })
    .get('/all', async (req, res) => {
        try {
            const response = await productsDbService.getAllProducts();
            // console.log("response from db after deleting is: ",response);

            if (response) {
                return res.json({ message: 'Product deleted successfully', products: response })

            }


        } catch (error) {
            console.log("Error in retriving products", error);
            throw new error;


        }
    })
    .get('/delete/:productId', async (req, res) => {
        const { productId } = req.params;
        try {
            const productImages = await productsDbService.getProduct(productId)
            console.log("productImages are: ", productImages);

            if (productImages) {



                cloudinary.api.delete_resources(productImages.imageId, (error
                    , result) => {
                    if (error) {
                        console.log('error in deleting resources', error);


                    } else {
                        console.log('Images deleted successfully:', result);
                    }
                })

            }

            const response = await productsDbService.deleteProduct(productId);
            // console.log("response from db after deleting is: ",response);

            if (response) {
                return res.json({ message: 'Product deleted successfully' })

            }


        } catch (error) {
            console.log("Error in deleting a product", error);
            throw new error;


        }
    })
    .post('/update/:productId', async (req, res) => {
        const { productId } = req.params;
        const data = req.body;
        console.log("productId and data in update is: ", productId, data);

        try {
            const response = await productsDbService.updateProductData(productId, data);
            console.log("response in update is: ", response);

            if (response) {
                return res.json({ data: response })

            }

        } catch (error) {
            console.log("Error in updating a product", error);
            throw new error;
        }

    })



module.exports = router;