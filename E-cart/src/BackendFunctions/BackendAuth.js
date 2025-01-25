/* eslint-disable no-unused-vars */

import axios from 'axios';
import config from '../config/config';
class BackendAuth {

    api;


    constructor() {


        this.api = axios.create({
            baseURL: config.backendURL,
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json',
            }
        })




    }

    // initializeInterceptor(){


    //     this.api.interceptors.request.use(
    //         (config)=>{
    //             const token=localStorage.getItem('token');
    //             if (token) {

    //                 config.headers['Authorization']=`Bearer ${token}`
    //             }
    //             return config;
    //         },
    //         (error)=>Promise.reject(error)
    //     )

    //     this.api.interceptors.response.use(
    //         (response)=>response,
    //         async (error)=>{
    //             const originalRequest=error.config;
    //             if (error.response && error.response?.status===401 && !originalRequest._retry) {
    //                 originalRequest._retry=true;

    //                 try {

    //                     const newToken=await this.revokeToken();
    //                     originalRequest.config['Authorization']=`Bearer ${newToken}`
    //                     return this.api(originalRequest)

    //                 } catch (error) {
    //                     console.log("Error in refreshing Token: ",error);
    //                     Promise.reject(error)


    //                 }



    //             }
    //             return Promise.reject(error)
    //         }

    //     )


    // }

    async login({ email, password }) {
        try {
            const response = await this.api.post('/auth/login', { email, password }, {

                withCredentials: true
            });



            return response.data

        } catch (error) {
            console.log("error in backendAuth of login: ",error || error.response?.data?.message);


            console.error('Login Failed due to Error: ', error.response?.data || error.message);
            throw error;


        }

    }

    async createUser({ fullName, email, password, phone ,role}) {

        try {
            const response = await this.api.post('/auth/register',
                { fullName, email, password, phone,role },

                { withCredentials: true }
            );

            return response.data;


        } catch (error) {

            console.error('Signup failed due to: ', error.response?.data || error.message)
            throw error;
        }

    }

    async getUser({ token }) {
        try {
            const response = await this.api.get('/auth/profile', {
                headers: {
                    //Check here Bearer
                    Authorization: `Bearer ${token}`
                }
            })
        

            return response.data;

        } catch (error) {
           
            if (error.response?.status === 401) {
                return Promise.reject(error);

            }


            console.error('Unexpected error in getUser:', error.response?.data || error.message);
            return Promise.reject(error);


        }
    }


    async updateUser({ newPassword},token) {

        try {
            const response = await this.api.post('/profile/update/newupdate',
                {password:newPassword},
                {
                headers:{
                    Authorization:`Bearer ${token}`
                },
               withCredentials:true
            });

            return response.data

        } catch (error) {
            console.error('Error Occured in updating: ', error.response?.data || error.message);

            throw error;

        }


    }

    //checking old password

    async checkOldPasssword({oldPassword},token){

        try {
            const response=await this.api.post('/profile/update/oldPassword',
                {password:oldPassword},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                    withCredentials:true
                },
                
            )
            console.log("checkOldPasssword response is: ",response);
            
            return response.data
            
        } catch (error) {
            console.error('Error Occured in updating: ', error.response?.data.message || error.message);

            throw error;

            
        }

    }
    //sending otp


    async otpSender(token){

        try {
            const response=await this.api.get('/profile/update/otp',{
                headers:{
                    Authorization:`Bearer ${token}`
                },
                
            }
                
            )

            console.log("otpSender response is: ",response);
            return response.data
            
        } catch (error) {
            console.error('Error Occured in updating: ', error ||error.response?.data );

            throw error;

            
        }

    }

    //verifyingOTP

    async verifyOtp(otp){
        try {
            const response=await this.api.post('profile/update/verify-otp',
                {otp}
            )
            console.log("verifyOtp response is: ",response);

            return response.data
            
        } catch (error) {
            console.error('Error Occured in updating: ', error.response?.data || error.message);

            throw error;
            
        }
    }



    async adminLogin({ email, password }) {
        try {
            const response = await this.api.post('/auth/admin', { email, password })
            return response.data

        } catch (error) {
            console.error('Error in AdminLogin: ', error.response?.data || error.message)

        }
    }



    async revokeToken() {
        try {
            const response = await this.api.get("/auth/revoke-token", { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error occurred while revoking token: ", error.response?.data || error.message);
            throw error;
        }
    }






}

const backendAuth = new BackendAuth();
export default backendAuth;