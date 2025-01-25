/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { toast } from "sonner";



function ProtectedRoute({children}) {
  const {status}=useSelector(state=>state.auth);
  
  const [isLogged, setIsLogged] = useState(false);
  console.log("status is: ",status)


  useEffect(()=>{

   
  
   
    if (status) {
      setIsLogged(status);
    }



  },[status])

  

  // Allow access to the protected route if authenticated
  return (isLogged)?children:<Navigate to='/sign-in' />
  
 
  
// return status?children:<Navigate to='/sign-in' />

}

export default ProtectedRoute


