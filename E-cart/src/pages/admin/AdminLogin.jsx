/* eslint-disable no-unused-vars */
import {  useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components'
import backendAuth from "../../BackendFunctions/BackendAuth";



function AdminLogin() {
  const [error, setError] = useState("");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const submitForm = (data) => {
    console.log("submit button clicked")
    backendAuth.login(data).then(response=>console.log(response)
    )
    
    
    console.log(data)
    reset();
    

  }

  return (
    <>
    <h2>Admin Page</h2>
      <div>
        having user account? <Link to='/sign-in'>Sign in</Link>
        <br />
        Don&apos;t have an account? <Link to='/sign-up'>Sign Up</Link>
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


        <Button
          type='submit'
        >Sign in</Button>

      </form>

      
    </>
  )
}

export default AdminLogin
