import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Updatepassword = () => {
    const[formdata,setFormData]=useState({
        password:"",
        confirmpassword:""
    })
    const {loading} = useSelector((state)=>state.auth);
    const [showPassword,setShowPassword] = useState(false);
    const [showconfirmPassword,setconfirmShowPassword] = useState(false);
    const location = useLocation();

    const dispatch = useDispatch();
    function handlechange(event){
        setFormData((prevdata)=>(
            {
                ...prevdata,
                [event.target.name]:event.target.value,
            }
        ))
    }
    const {password,confirmpassword}=formdata;

    function handlesubmit(event){
        event.preventDefault();
       const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmpassword,token))
    }

  return (
    <div className='text-richblack-5'>
        {
            loading?(
            <div>loading ...</div>
            )
            :
            (
                <div>
                    <h1>Choose new Password</h1>
                    <p>Enter your new Password</p>
                    <form onSubmit={handlesubmit}>
                            <label>
                                <p>New password</p>
                                <input
                                required
                                type={showPassword?"text":"password"}
                                name='password'
                                value={password}
                                onChange={handlechange}
                                placeholder='New password'
                                />
                                <span onClick={()=> setShowPassword((prev)=>!prev)}>
                                    {
                                        showPassword?<FaRegEyeSlash fontSize={24}/>:<IoEyeOutline fontSize={24} />
                                    }
                                </span>
                            </label>

                            <label>
                                <p>Confirm New password</p>
                                <input
                                required
                                type={showconfirmPassword?"text":"password"}
                                name='confirmpassword'
                                value={confirmpassword}
                                onChange={handlechange}
                                placeholder='Confirm New password'
                                />
                                <span onClick={()=> setconfirmShowPassword((prev)=>!prev)}>
                                    {
                                        showconfirmPassword ? <FaRegEyeSlash fontSize={24}/>:<IoEyeOutline fontSize={24} />
                                    }
                                </span>
                            </label>

                            <button type='submit'>
                                Reset Button
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

export default Updatepassword