import React from 'react'
import Contactusform from '../Contactuspage/Contactusform'

const ContactFormSection = () => {
  return (
    <div className='mx-auto w-[30%] text-richblack-5 mt-10 flex flex-col gap-4 items-center mb-10'>
        <h1 className='text-4xl font-bold'>
            Get in Touch
        </h1>
        <p>
            We'd love to here for you, Please fill out this form.
        </p>
        <div>
            <Contactusform/>
        </div>
    </div>
  )
}

export default ContactFormSection