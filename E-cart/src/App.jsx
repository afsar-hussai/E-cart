/* eslint-disable no-unused-vars */



import { useDispatch, useSelector } from "react-redux";
import { Footer, Header } from "./components"
import {Outlet, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import backendAuth from "./BackendFunctions/BackendAuth";
import {  updateState } from "./store/authSlice";

import { toast } from "sonner";



function App() {

  // const userStatus=useSelector(state=>state.auth.status);
  const dispatch=useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const token=localStorage.getItem('token');

  
 
  
  useEffect(() => {
    let isMounted = true;
    let toastShown = false;

    const handleAuthentication = async () => {
      
      try {
        if (token) {
          const response = await backendAuth.getUser({ token });
          if (response) {
            console.log("1st Try in App.jsx")
            
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
              console.log("2 Try in App.jsx")
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
      } finally {
        setIsLoading(false);
      }
    };


    if (isMounted) {
     
        
        handleAuthentication();
     
      
    }
    return ()=>{
      isMounted=false;
    }
  

  
  }, [dispatch, token]);
  

  

  if (isLoading) {
    return <div className="flex justify-center items-center bg-slate-900 text-white h-screen">Loading...</div>;
    
  }
 
  
  

  
  

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
