/* eslint-disable no-unused-vars */

import { useForm } from 'react-hook-form'
import { Input, Button } from '../../components'
import { useState } from 'react'
import backendAuth from '../../BackendFunctions/BackendAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Update() {
    const [stepError, setStepError] = useState("");
    const [otpVerified, setOtpVerified] = useState(false)
    const [step, setStep] = useState(1);
    const [oldPasswordVerified, setOldPasswordVerified] = useState(false)
    const token=localStorage.getItem('token');
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
        
    }=useForm()

    const updatePassword=async (data)=>{
        console.log("submit clicked",data)
        
        
        

        if (step === 1) {

          try {
            const oldPasswordVerified=await backendAuth.checkOldPasssword({oldPassword:data.oldPassword},token);
            console.log("This is try of updatePassword",oldPasswordVerified)
            if (oldPasswordVerified) {
              console.log("This is step 1 if");
              const otpResponse=await backendAuth.otpSender(token);
              console.log("otpResponse in updatePassword: ",otpResponse)
              
              setStep(2);
              setOldPasswordVerified(true);
              setStepError(""); // Clear previous error
            } else {
              console.log("This is step 1 else");
              setStepError('Old password is not correct');
            }
            
          } catch (error) {
            console.log("Error in first step: ",error ||error?.response?.data?.message)
            setStepError(error?.response?.data?.message);
            throw error;          
            
          }
          
        } else if (step === 2) {

          try {
            const otpVerifyStatus=await backendAuth.verifyOtp(data.otp)
            console.log("otpVerifyStatus is: ",otpVerifyStatus)
            

            if (oldPasswordVerified && otpVerifyStatus?.valid) {
              console.log("This is step 2 if");
              setStep(3);
              
              setOtpVerified(true);
              setStepError(""); // Clear previous error
            } else {
              console.log("This is step 2 else");
              setStepError(otpVerifyStatus?.message);
            }
            
          } catch (error) {
            console.log("Error in secondstep: ",error)
            setStepError("Error Occured in Verifying OTP")
            throw error
            
            
          }
          
          
        } else if (step === 3) {
          try {
            const updatedpasswordStatus=await backendAuth.updateUser({newPassword:data.newPassword},token)

            if (oldPasswordVerified && otpVerified && data.newPassword) {
              console.log("This is step 3 if");
              console.log("New Password is: ", data.newPassword);
              setStepError("");
              toast.success('Password Updated successfully')
              navigate('/')
            } else {
              console.log("This is step 3 else");
              setStepError('New password is not valid');
            }
            
          } catch (error) {
            console.log("Error in step 3: ",error);
            setStepError("Error Occured in updating password")
            throw error;
            
            
          }
          
          
        }

    }
  return (
    <div>
      <form onSubmit={handleSubmit(updatePassword)} >

        {step===1 && (
            <>
           
            
            <Input 
        {...register('oldPassword', {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 
                "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
            },
          })}
        label='Enter Old Password: '
        placeholder='Old password'
        type='password'

        />
        {errors.oldPassword && <p className="text-red-600">{errors.oldPassword.message}</p>
        }
        {stepError &&  <p className="text-red-600">{stepError}</p>}

        <Button
        type='submit'
        
        >Verify Old Password</Button>
         </>
        
        )
        }


        {step===2 && oldPasswordVerified && (
            <>

<Input 
        {...register('otp', {
            required: "OTP is required",
            
          })}
        label='Enter OTP: '
        placeholder='OTP...'
        type='text'

        />
        {errors.otp && <p className="text-red-600">{errors.otp.message}</p>
        }
        {stepError &&  <p className="text-red-600">{stepError}</p>}


        <Button
        type='submit'
        >
            Verify OTP
        </Button>
        

            
            </>
        ) }


{step===3 && oldPasswordVerified && otpVerified && (
            <>

<Input 
        {...register('newPassword', {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 
                "Password must be at least 8 characters, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
            },
            
          })}
        label='Enter New Password: '
        placeholder='Password...'
        type='text'

        />
        {errors.newPassword && <p className="text-red-600">{errors.newPassword.message}</p>
        }

        <Button
        type='submit'
        >
            submit
        </Button>
        

            
            </>
        ) }
        



      </form>

    </div>
  )
}

export default Update
