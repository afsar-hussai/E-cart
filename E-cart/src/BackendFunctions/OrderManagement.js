
import axios from "axios";
import config from "../config/config";

class OrderManagement{
    api;

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

    async createOrder(data){
        console.log("data in orderManagement backend API is: ",data);
        

        try {
            const response=await this.api.post('/orders/create',data,{
                withCredentials:true
            })
            return response.data
            
        } catch (error) {
            console.log("error in createOrder of OrderManagement: ",error);
            
            throw error;
        }
        
    }

    //get all orders

    async getAllOrders(){

        try {
            const response=await this.api.get('/orders/getallOrders');
            console.log("response in getAllOrders is: ",response);
            return response.data;
            
        } catch (error) {
            console.log("error in getAllOrders of OrderManagement: ",error);
            
            throw error;
            
        }
    }


}

const orderManagement=new OrderManagement();

export default orderManagement;