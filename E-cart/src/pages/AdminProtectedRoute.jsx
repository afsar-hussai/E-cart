/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { toast } from "sonner";



function AdminProtectedRoute({children}) {
  const isLogged=useSelector(state=>state.admin.status);
  
  
  console.log("status is: ",isLogged)


  
  

  // Allow access to the protected route if authenticated
  return isLogged?children:<Navigate to='/admin/sign-in' />
  
 
  


}

export default AdminProtectedRoute


