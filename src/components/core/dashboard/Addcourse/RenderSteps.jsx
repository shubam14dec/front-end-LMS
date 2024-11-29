import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourse from "./PublishCourse"

const RenderSteps = () => {
    const {step} = useSelector((state)=>state.course);

    const steps=[
        {
            id:1,
            title:"Course information",
        },
        {
            id:2,
            title:"Course builder",
        },
        {
            id:3,
            title:"Publish",
        },
    ]

  return (
    <>
    <div className='flex justify-around'>
        {
            steps.map((item,index)=>(
                <div className='flex flex-col w-3 rounded-xl' key={index}>
                    <div className={`${step===item.id ? "bg-yellow-900 border-yellow-50 text-yellow-50":"border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                    {
                        step > item.id ?(<div className='"bg-yellow-900 border-yellow-50 text-yellow-50'><FaCheck/></div>):(item.id)
                    }
                    </div>
                </div>
            ))
            
        }
    </div>
    <div className='flex justify-around'>
        {
            steps.map((item,index)=>(
                <div key={index}>{item.title}</div>
            ))
        }
    </div>
    <div>
    {step===1 && <CourseInformationForm/>}
    {step===2 && <CourseBuilderForm/>}
    {step===3 && <PublishCourse/>} 
    </div>
   

    </>
    
  )
}

export default RenderSteps