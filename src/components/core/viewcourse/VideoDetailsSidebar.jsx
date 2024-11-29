import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { FaHandPointLeft } from "react-icons/fa";

const VideoDetailsSidebar = () => {

    const [activeStatus,setActiveStatus]=useState("");
    const [videoBarActive,setVideoBarActive]=useState("");
    const navigate=useNavigate();
    const location = useLocation();
    const {sectionId,subsectionId}= useParams();
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLecture,
        completedLecture,
    } = useSelector((state)=>state.viewCourse);

    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.lenth){
                return;
            }
            const currentSectionIndex = courseSectionData.findIndex(
                (data)=>data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.subsection.findIndex(
                (data)=>data._id === subsectionId
            )
            const activeSubSectionId = courseSectionData[currentSubSectionIndex]?.subsection[currentSubSectionIndex]?._id;
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            setVideoBarActive(activeSubSectionId);
        })()
    },[courseSectionData,courseEntireData,location.pathname])



  return (
    <>
        <div className='text-richblack-25 pl-2 w-[15vw]'>
            {/* for buttons and heading */}
            <div className='flex flex-col gap-12'>
                <div>   
                    <button
                    onClick={()=>{
                        navigate("/dashboard/enrolled-courses")
                    }}
                    className='flex items-center text-lg p-3 gap-x-2'
                    >
                         <IoChevronBackCircleSharp /><p>Back</p>
                    </button>
                </div>
                <div className='text-2xl mb-2'>
                    <p>{courseEntireData.courseName}</p>
                    {/* <p>{completedLecture.length}/{totalNoOfLecture}</p> */}
                </div>
            </div>
            {/* for section and subsection  */}
            <div className='text-yellow-25 mb-3'>Course Sections</div>

            <div >
                    {
                        courseSectionData.map((course,index)=>(
                            <div onClick={()=> setActiveStatus(course._id)} key={index}>
                                <div>
                                    {/* section  */}
                                    <div className='flex items-center gap-x-2 text-lg cursor-pointer'>
                                        {course.sectionName}
                                        <FaHandPointLeft />
                                    </div>
                                </div>
                                {/* subsection  */}
                                <div className='cursor-pointer'>
                                    {
                                        activeStatus === course._id && (
                                            <div>
                                                {
                                                    course.subsection.map((topic,index)=>(
                                                        <div
                                                        className={`flex gap-5 p-5 ${videoBarActive===topic._id ?"bg-yellow-200 text-richblack-900":"bg-richblack-900 text-white"}`}
                                                        key={index}
                                                        onClick={()=>{
                                                            navigate(`/view-course/${courseEntireData._id}/section/${course._id}/sub-section/${topic._id}`)
                                                            setVideoBarActive(topic._id)
                                                        }}
                                                        >
                                                            {/* <input
                                                            type='checkbox'
                                                            checked={completedLecture.includes(topic._id)}
                                                            onChange={()=>{}}
                                                            /> */}
                                                            <span>
                                                                {topic.title}
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar