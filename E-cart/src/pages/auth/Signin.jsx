


import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form';
import { Button, Input } from '../../components/index'
import backendAuth from "../../BackendFunctions/BackendAuth";
import { useDispatch } from "react-redux";
import { updateState } from "../../store/authSlice";
import { toast } from "sonner";




function Signin() {
  const [error, setError] = useState("");
  const dispatch=useDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();




  const submitForm = async (data) => {
   
    try {
      const response = await backendAuth.login(data);
      localStorage.setItem('token',response.token)
      if (response) dispatch(updateState(data))
      toast.success('Logged in successfully',{
    duration:1000
  }) 
    
      navigate('/');

    } catch (err) {
      console.log("err in Catch is: ", err)
      setError(err.response?.data?.message);



    } finally {
      reset()
    }



  }

 

  return (
    <>
      <div className="h-screen bg-red-300 flex flex-col justify-center items-center">
      
      



        <div className="bg-green-300 rounded-md p-3 w-1/3 ">


          <h2>Sign in Page</h2>
          <div>
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

          <div className="text-blue-500 font-bold">

            <Link to='/admin/sign-in' >
              Admin Login
            </Link>

          </div>
        </div>

      </div>
    </>
  )
}

export default Signin
