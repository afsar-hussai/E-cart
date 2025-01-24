/* eslint-disable no-unused-vars */

import { useForm } from 'react-hook-form'
import { Input, Button } from '../../components'
import { useState } from 'react'
function Update() {
    const [stepError, setStepError] = useState("");
    const [otpVerified, setOtpVerified] = useState(false)
    const [step, setStep] = useState(1);
    const [oldPasswordVerified, setOldPasswordVerified] = useState(false)
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
        
    }=useForm()

    const updatePassword=(data)=>{
        console.log("submit clicked",data)
        

        if (step === 1) {
          if (data.oldPassword === 'Ashu@143') {
            console.log("This is step 1 if");
            setStep(2);
            setOldPasswordVerified(true);
            setStepError(""); // Clear previous error
          } else {
            console.log("This is step 1 else");
            setStepError('Old password is not correct');
          }
        } else if (step === 2) {
          if (oldPasswordVerified && data.otp === '123') {
            console.log("This is step 2 if");
            setStep(3);
            setOtpVerified(true);
            setStepError(""); // Clear previous error
          } else {
            console.log("This is step 2 else");
            setStepError('OTP is not correct');
          }
        } else if (step === 3) {
          if (oldPasswordVerified && otpVerified && data.newPassword) {
            console.log("This is step 3 if");
            console.log("New Password is: ", data.newPassword);
            setStepError(""); // Clear previous error
          } else {
            console.log("This is step 3 else");
            setStepError('New password is not valid');
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
