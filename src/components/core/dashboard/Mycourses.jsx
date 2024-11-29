import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import IconBtn from '../../common/IconBtn';
import CoursesTable from './CoursesTable';

const Mycourses = () => {
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const [courses,setCourses] = useState([]);

    useEffect(()=>{
        const fetchCourses = async()=>{
            const result = await fetchInstructorCourses(token);
            if(result){
                setCourses(result);
            }
        }
        fetchCourses();
    },[])

  return (
    <div className='text-richblack-5'>
        <div className='flex gap-12'>
            <h1 className='text-3xl font-bold'>My Courses</h1>
            <IconBtn
                text="Add Course"
                onClickHandler={()=>navigate("/dashboard/add-course")}
            
            />
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default Mycourses