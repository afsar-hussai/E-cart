/* eslint-disable no-unused-vars */
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateState ,updateStateToFalse } from "../../store/adminSlice";
import { toast } from "sonner";
import adminApisForBackendCommunication from "../../BackendFunctions/AdminApis";
import { Link, Navigate, Outlet } from "react-router-dom";
import { Footer, Header } from "../../components";
import AdminHeader from "./AdminHeader";

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const dispatch=useDispatch();
    const userState=useSelector(state=>state.admin.status);

    

    
    

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
    <div className="flex flex-col min-h-screen" >

        

        <Header>
            <AdminHeader/>

        </Header>

        <main className="flex-grow" >
            <Outlet/>
        </main>

        <Footer/>
        
        
        
        
      
    </div>
  )
}

export default Dashboard
