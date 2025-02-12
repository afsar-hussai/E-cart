class Service{
    Products;
    Admin;
    constructor() {
        this.Products=require('../models/productModel');
        this.Admin=require('../models/adminModel');

        
    }

    async getAdmin({email}){

        return await this.Admin.findOne({email})

    }


    async createProduct(productData){
        return await this.Products.create(productData)
    }

    async getProduct(productData){

        return await this.Products.findOne({_id:productData})

    }
    async getAllProducts(){

        return await this.Products.find()

    }

    async updateProduct(search,productData,imageNames){

        return await this.Products.findByIdAndUpdate(search,{imageUrl:productData,imageId:imageNames},{new:true})

    }
    async updateProductData(search,data){
        return await this.Products.findByIdAndUpdate(search,data,{new:true})
    }
    async deleteProduct(id){

        return await this.Products.findByIdAndDelete(id)

    }


}

const ProductsDbService=new Service();

module.exports=ProductsDbService;