/* eslint-disable no-unused-vars */



import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "./components"
import {Outlet} from "react-router-dom";
import { useEffect, useState } from "react";
import backendAuth from "./BackendFunctions/BackendAuth";
import {  updateState } from "./store/authSlice";
import { toast } from "sonner";



function App() {

  const userStatus=useSelector(state=>state.auth.status);
  const dispatch=useDispatch();
  const token=localStorage.getItem('token');
  console.log("userStatus: ",userStatus)
  
 
  
  useEffect(() => {
    let isMounted = true;
    let toastShown = false;

    const handleAuthentication = async () => {
      
      try {
        if (token) {
          const response = await backendAuth.getUser({ token });
          if (response) {
            dispatch(updateState({ email: response?.email }));
           
           
          }
        }
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            
            const newTokenResponse = await backendAuth.revokeToken();
            localStorage.setItem('token', newTokenResponse.token);
            const newUserResponse = await backendAuth.getUser({ token: newTokenResponse.token });
            if (newUserResponse) {
              dispatch(updateState({ email: newUserResponse?.email }));
              
            }
          } catch (tokenRenewalError) {
            
            if (!toastShown) {
              toast.message("Session expired. Please log in again.");
              toastShown=true;
              
            }
          }
        } else {
          
          if (!toastShown) {
            toast.error("An error occurred. Please try again.");
            toastShown=true;
            
          }
        }
      } 
    };


    if (isMounted) {
     
        
        handleAuthentication();
     
      
    }
    return ()=>{
      isMounted=false;
    }
  

  
  }, [dispatch, token]);
  
  // useEffect(() => {
  //   if (userStatus) {
  //     toast.success("Welcome",{
  //       duration:1000
  //     });
      
  //   }
  // }, [userStatus])
  

  
  

  
  

  return (
 
    <>


    
      <Header />
      

      <main className="h-screen">
        <Outlet />
      </main>

      <Footer />


      </>
      
    
  )
}

export default App
