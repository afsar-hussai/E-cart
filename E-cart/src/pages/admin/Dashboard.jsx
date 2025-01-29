/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateState ,updateStateToFalse } from "../../store/adminSlice";
import { toast } from "sonner";
import adminApisForBackendCommunication from "../../BackendFunctions/AdminApis";
import { Link, Navigate } from "react-router-dom";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.admin.status);

    const handleLogout=async ()=>{
        try {
            const response=await adminApisForBackendCommunication.logout();
            console.log("response of logout is: ",response)
            toast.success('Logged out successfully');
            dispatch(updateStateToFalse());
            
            
        } catch (error) {
            console.log("Error in Logout",error);
            throw error;            
            
        }
    }

    
    

    useEffect(()=>{


        const handleauthenticate=async ()=>{
            try {
                const response=await adminApisForBackendCommunication.authenticate();
                console.log("response in dashboard",response);
                
                if (response) {
                    dispatch(updateState(response.data))

                    
                }
                
                
                
            } catch (error) {
                console.log("Error in Login in dashboard",error);
                toast.error('Please Login')
                throw error;
                
                
            }finally{
                console.log("userState in admin dashboard is: ",userState)
                
                setLoading(false)
            }

        }

        handleauthenticate();

        
        

    },[dispatch, loading, userState])

    if (loading) {
        return <div className="flex justify-center items-center bg-slate-900 text-white h-screen">Loading...</div>;
        
    }
    
    if(!userState){
        return <div>
            <Navigate to='/admin/sign-in' />
            
        </div>
    }

  return (
    <div>
        
        
        <button
        onClick={handleLogout}
        
        >Logout</button>
        
      This is Dashboard page under admin folder.
    </div>
  )
}

export default Dashboard
