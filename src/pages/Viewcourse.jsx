import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/viewcourse/VideoDetailsSidebar';
import { Outlet } from 'react-router-dom';

const Viewcourse = () => {

    const {courseId}= useParams();
    const {token}=useSelector((state)=>state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            console.log("courseId is ",courseId);
            const courseData = await getFullDetailsOfCourse(courseId,token);
            console.log(courseData);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData.courseDetails.courseContent.forEach((sec) => {
                    lectures+=sec.subsection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[])

  return (
    <div className='flex w-full justify-between'>
        <VideoDetailsSidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Viewcourse