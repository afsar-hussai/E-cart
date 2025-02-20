/* eslint-disable no-unused-vars */
import axios from 'axios';
import config from '../config/config';
class ProductManagement{
    api;

    //constructor
    constructor(){
        this.api=axios.create({
            baseURL:config.backendURL,
            timeout:10000,
            headers:{
                'Content-Type':'application/json',
            }
        })
    }

    //functions

    async createProduct(data){
        console.log("data in productManagement backend API is: ",data);
        

        try {
            const response=await this.api.post('/product/create',data,{
                withCredentials:true
            })
            return response.data
            
        } catch (error) {
            console.log("error in createProduct of ProductManagement: ",error);
            
            throw error;
        }
        
    }


    //upload image
    async uploadImage(data,productId){
        
        
        try {
            const files=data;
         
            
            const formData=new FormData();
          
            

            for (let i = 0; i < files.length; i++) {
                formData.append('files',files[i])
                
            }
           
            const response=await this.api.post(`/product/image/${productId}`,formData,{
                headers:{
                    'Content-Type':"multipart/form-data"
                },
                withCredentials:true
            })
            console.log("response");
            return response.data;
            
            
        } catch (error) {
            console.log("error in uploadImage of ProductManagement: ",error);
            throw error;
        }
    }

    //update Product

    async updateProduct(id,data){
        try {
            const response=await this.api.get('/product/update',{
                withCredentials:true
            })
            return response.data
            
        } catch (error) {
            console.log("error in updateProduct of ProductManagement: ",error);
            
            throw error;
        }

    }

    //updateProductData only

    async updateProductData(id,data){
        try {
            const response=await this.api.post(`/product/update/${id}`,data,{
                withCredentials:true
            })
            return response.data
            
        } catch (error) {
            console.log("error in createProduct of ProductManagement: ",error);
            
            throw error;
        }

    }

    //get all products

    async allProductsRetrival(){
        try {
            const response=await this.api.get('/product/all',{
                withCredentials:true
            })
            return response.data
            
        } catch (error) {
            console.log("error in allProductsRetrival of ProductManagement: ",error);
            
            throw error;
        }

    }

    //delete product
    async deleteProduct(productId){
        try {
            const response=await this.api.get(`/product/delete/${productId}`,{
                withCredentials:true
            })
            return response.data
            
        } catch (error) {
            console.log("error in deleteProduct of ProductManagement: ",error);
            
            throw error;
        }

    }



}
const productManagement=new ProductManagement();
export default productManagement;