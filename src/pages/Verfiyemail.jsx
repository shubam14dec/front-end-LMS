import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { sendOtp, signup } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";


const Verfiyemail = () => {
    const {signupData,loading} = useSelector((state)=>state.auth);
    const [otp,setotp]=useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handlesubmit(event){
        event.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmpassword
        } = signupData;
        dispatch(signup(accountType,firstName,lastName,email,password,confirmpassword,otp,navigate));
    }
  return (
    <div className='text-richblack-5 flex justify-center items-center min-h-[calc(100vh-3.5rem)]'>
        {
            loading?(<div>
                    Loading ...
            </div>):(
                <div className='flex flex-col gap-3'>
                    <h1 className='text-2xl font-bold'>Verify Email</h1>
                    <p className='text-richblack-200 text-xl'>A verification code has been sent . Enter the code below </p>
                    <form onSubmit={handlesubmit} className='flex flex-col items-center gap-3' >
                        <div className='text-richblack-800 scale-150'>
                        <OTPInput
                            value={otp}
                            onChange={setotp}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                            renderSeparator={<span className='text-richblack-5'>&nbsp;-&nbsp;</span>}
                        />
                        </div>
                        
                        <button type='submit' className='bg-yellow-50 text-center text-[13px] px-6 py-3 rounded-md font-bold
                        hover:scale-95 transition-all duration-200'>
                            Verify your email
                        </button>
                    </form>
                    <div className='flex justify-between'>
                        <div>
                                <Link to="/signup">
                                <div className='flex gap-2 items-center'>
                                <GoArrowLeft />
                                <p>Back to Signup</p>
                                </div>
                                </Link>
                        </div>
                        <button onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>
                            Resend OTP
                        </button>
                    </div>
                        
                    
                </div>
            )
        }
    </div>
  )
}

export default Verfiyemail