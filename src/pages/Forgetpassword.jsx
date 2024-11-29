import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const Forgetpassword = () => {
    const {loading} = useSelector((state)=>state.auth);
    const [emailsent,sentemailsent] = useState(false);
    const [email,sentemail]=useState("");
    const dispatch = useDispatch()

    function handleOnSubmit(event){
            event.preventDefault();
            dispatch(getPasswordResetToken(email,sentemailsent))
    }

  return (
    <div className='text-richblack-5 flex justify-center text-center'>
        {
            loading ?(
                <div>Loading ...</div>
            ):(
                <div className='flex flex-col'>
                    <h1>
                        {
                            !emailsent ? "Reset your Password":"Check your Email"
                        }
                    </h1>
                    <p>
                        {
                            !emailsent ?"Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`We have sent the reset email to ${email}`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailsent && (
                                <label>
                                    <p>Email Address*</p>
                                    <input
                                    required
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e)=>sentemail(e.target.value)}
                                    placeholder='Enter your Email Address'
                                    />
                                </label>
                            )
                        }
                        <button type='submit'>
                            {
                                !emailsent ? "Reset Password":"Resend Email"
                            }
                        </button>
                    </form>
                        <div>
                                <Link to="/login">
                                <p>Back to login</p>
                                </Link>
                        </div>
                </div>
            )
        }
    </div>
  )
}

export default Forgetpassword