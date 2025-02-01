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
}
const productManagement=new ProductManagement();
export default productManagement;