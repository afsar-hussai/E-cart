import axios from 'axios';
import config from '../config/config';

class AdminApis{
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

    //Login Admin
    async login({email,password}){
        try{
            const response=await this.api.post('/admin/login',{email,password},{
                withCredentials:true
            });
            return response.data;
        }catch(error){
            console.error('Login Failed due to Error: ',error || error.response?.data);
            throw error;
        }
    }

    async authenticate(){
        try{
            const response=await this.api.get('/admin/authenticate',{
                withCredentials:true
            });
            return response.data;
        }catch(error){
            console.error('Login Failed due to Error: ',error || error.response?.data);
            throw error;
        }

    }


    async logout(){
        try{
            const response=await this.api.get('/admin/logout',{
                withCredentials:true
            });
            return response.data;
        }catch(error){
            console.error('Login Failed due to Error: ',error || error.response?.data);
            throw error;
        }

    }
    



}

const adminApisForBackendCommunication=new AdminApis();

export default adminApisForBackendCommunication;