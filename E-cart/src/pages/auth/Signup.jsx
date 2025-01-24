
import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components'
import { useNavigate } from "react-router-dom";

import backendAuth from "../../BackendFunctions/BackendAuth";
import { useDispatch } from "react-redux";
import { updateState } from "../../store/authSlice";




function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const submitForm = (data) => {
    setError("");
   
    backendAuth.createUser({...data,role:'user'}).then(response => {
      
      localStorage.setItem('token', response.token);
       if (response) dispatch(updateState(data)) 
      
      navigate('/')

    }
    ).catch(err => {
      console.log('error Got as: ', err)

      setError(err.response?.data?.message)
    })



    


    reset();


  }

  return (
    <>

      <div className="h-screen bg-red-300 flex flex-col justify-center items-center">



        <div className="bg-green-300 rounded-md p-3 w-1/3 ">

          <h2>Sign up Page</h2>
          <div>
            Already have an account? <Link to='/sign-in'>Sign Up</Link>
          </div>
          {error && <div className="text-red-600">{error}</div>}

          <form onSubmit={handleSubmit(submitForm)} >

            <Input
              {...register("fullName", {
                required: true,
              })}


              label='Full Name: '
              placeholder='Enter Full Name...'
              type='text'

            />

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

            <Input
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\+?[1-9]\d{1,14}$|^\d{10}$/,
                  message: 'Please Enter Valid mobile number with country code'
                }
              })}

              label='Mobile Number: '
              placeholder='Please Enter Mobile Number...'
            />

            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}


            <Button
              type='submit'
            >Sign Up</Button>

          </form>

        </div>
      </div>
    </>
  )
}

export default Signup
