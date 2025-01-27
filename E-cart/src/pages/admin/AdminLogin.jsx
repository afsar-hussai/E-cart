/* eslint-disable no-unused-vars */
import {  useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components'
import adminApisForBackendCommunication from "../../BackendFunctions/AdminApis";




function AdminLogin() {
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const submitForm = async (data) => {
    console.log("submit button clicked");

    try {
      const response=await adminApisForBackendCommunication.login(data);
      console.log("response of Admin Login is: ",response)
      
      
    } catch (error) {
      console.log("Error in Admin Sign in: ",error);
      throw error;
      
      
    }

    
   
    
    
    console.log(data)
    reset();
    

  }

  return (
    <div className="bg-pink-400 h-screen flex justify-center items-center">
      <div className="bg-white p-2 rounded-md w-1/4">

     
    <h2>Admin Page</h2>
      <div>
        having user account? <Link to='/sign-in' className="text-blue-700 font-semibold">Sign in</Link>
        <br />
        Don&apos;t have a user account? <Link to='/sign-up' className="text-blue-700 font-semibold">Sign Up</Link>
      </div>
      {error && <div className="text-red-600">{error}</div>}

      <form onSubmit={handleSubmit(submitForm)} >

        <Input
          {...register("email", {
            required: true, pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        

          label='Email: '
          placeholder='Enter Email...'
          type='text'
         
        />

        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        {error && <p className="text-red-600">{error}</p>}


        <Input
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
            },
          })}

          label='Password: '
          placeholder='Enter password...'
          type='password'
          
       
        />

{errors.password && <p className="text-red-600">{errors.password.message}</p>}
{error && <p className="text-red-600">{error}</p>}

        <Button
          type='submit'
        >Sign in</Button>

      </form>

      </div>
    </div>
  )
}

export default AdminLogin
