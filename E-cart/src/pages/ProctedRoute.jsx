/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { toast } from "sonner";



function ProtectedRoute({children}) {
  const isLogged=useSelector(state=>state.auth.status);
  
  
  console.log("status is: ",isLogged)


  
  

  // Allow access to the protected route if authenticated
  return isLogged?children:<Navigate to='/sign-in' />
  
 
  


}

export default ProtectedRoute


