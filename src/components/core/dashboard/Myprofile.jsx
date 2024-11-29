import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

const   Myprofile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
  return (
    <div className='text-richblack-5 gap-7 flex flex-col'>
        <h1>
            My Profile
        </h1>

        {/* section 1 */}
        <div>
            <div className='flex justify-between'>
                <div> 
                    <img src={user.image} alt='profile'
                    className='aspect-square w-[78px] rounded-full object-cover'/>
                    <div className='flex flex-col'>
                        <h2>{user.firstName + " " + user.lastName}</h2>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div>
                    <IconBtn
                    text="Edit"
                    onClickHandler={()=>{
                        navigate("/dashboard/settings")
                    }} />
                </div>
            </div>
        </div>

        {/* section 2 */}
        <div>
            <div className='flex justify-between items-center mt-6'>
                <p className='text-2xl'>About</p>
                <IconBtn
                onClickHandler={()=>{navigate("/dashboard/settings")}}
                text={"Edit"}
                />
            </div>
            <p>{user.additionalDetails.about?(user.additionalDetails.about):("Write something about yourself")}</p>
        </div>

        {/* section 3 */}
        <div className='flex flex-col'>
            <div className='flex justify-between'>
                <p>Personal Details</p>
                <IconBtn
                onClickHandler={()=>{navigate("/dashboard/settings")}}
                text={"Edit"}
                />
            </div>
            <div className='flex justify-between'>
                <div>
                <div className='flex gap-6'>
                    <p>First Name</p>
                    <p>{user.firstName}</p>
                </div>
                <div className='flex gap-6'>
                    <p>Email</p>
                    <p>{user.email}</p>
                </div>
                <div className='flex gap-6'>
                    <p>Gender</p>
                    <p>{user.additionalDetails.gender}</p>
                </div>
                </div>
                <div>
                <div className='flex gap-6'>
                    <p>Last Name</p>
                    <p>{user.lastName}</p>
                </div>
                <div className='flex gap-6'>
                    <p>Phone Number</p>
                    <p>{user.additionalDetails.contactNumber?user.additionalDetails.contactNumber:"Add Contact Number"}</p>
                </div>
                <div className='flex gap-6'>
                    <p>Date of Birth</p>
                    <p>{user.additionalDetails.dateOfBirth?user.additionalDetails.dateOfBirth:"Add your Date of Birth"}</p>
                </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Myprofile