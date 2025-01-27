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

        return await this.Products.findOne(productData)

    }

    async updateProduct(search,productData){

        return await this.Products.findOneAndUpdate({email:search},productData,{new:true})

    }
    async deleteProduct(id){

        return await this.Products.findOneAndDelete(id)

    }


}

const ProductsDbService=new Service();

module.exports=ProductsDbService;