import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from '../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from "react-icons/fa";

const CoursesTable = ({courses,setCourses}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const [loading,setLoading]=useState(false);
    const [confirmationModal,setConfirmationModal]=useState(null);
    
    const handleCourseDelete=async(courseId)=>{
        setLoading(true);
        await deleteCourse({courseId:courseId},token);
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

  return (
    <div className='mt-10'>   
        <Table>
            <Thead>
                <Tr className='flex justify-between text-2xl'>
                    <Th className='ml-8'>
                        Courses
                    </Th>
                    
                    <div className='flex gap-40' >
                        <Th>
                            Price
                        </Th>
                        <Th className='mr-4'>
                        Actions
                        </Th>
                    </div>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length===0?(
                        <Tr>
                            <Td>No Courses Found</Td>
                        </Tr>
                    ):(
                        courses.map((course)=>(
                            <Tr key={course._id} className='flex justify-between w-full border-richblack-800 p-8'>
                                <Td className='flex gap-x-3'>
                                    <img
                                        src={course.thumbnail}
                                        className='h-[150px] w-[220px] rounded-lg object-cover'
                                    />
                                    <div className='flex flex-col'>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                        
                                    </div>
                                </Td>
                               <div className='flex items-center gap-16'>
                                        <Td>
                                            <p className='flex items-center'><FaRupeeSign />{course.price}</p>
                                        </Td>
                               
                                <Td className='flex gap-x-6'>
                                    <button
                                    disabled={loading}
                                    className='bg-yellow-50 text-xl px-3 rounded-md text-black font-semibold'
                                    onClick={()=>{
                                        navigate(`/dashboard/edit-course/${course._id}`)
                                    }}
                                    >
                                    Edit
                                    </button>
                                    <button
                                    disabled={loading}
                                    className='bg-yellow-50 text-xl px-3 rounded-md text-black font-semibold'
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do u want to delete this course",
                                            text2:"All the data of this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:!loading? ()=>handleCourseDelete(course._id):()=>{},
                                            btn2Handler:!loading? ()=>setConfirmationModal(null):()=>{},
                                        })
                                    }}>
                                        Delete
                                    </button>
                                </Td>
                               </div>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CoursesTable