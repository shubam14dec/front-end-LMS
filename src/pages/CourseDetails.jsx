import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buycourse } from '../services/operations/studentFeatureAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { useEffect,useState } from 'react';

const CourseDetails = () => {
    const {token}=useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId} = useParams();
    const [response, setResponse] = useState(null)


    const handleBuyCourse=()=>{
        if(token){
            buycourse(token,[courseId],user,navigate,dispatch);
            return;
        }
    }

    useEffect(() => {

        ; (async () => {
          try {
            const res = await fetchCourseDetails(courseId)
            console.log(res);
    
            setResponse(res)
          } catch (error) {
            console.log("Could not fetch Course Details")
          }
        })()
      }, [courseId])

      

  return (
    <div className={`relative w-full bg-richblack-800`}>
        {/* Hero Section */}
        <div className="mx-auto box-content px-4 ">
          <div className="flex min-h-[450px] gap-10 py-8">
            <div className="relative block max-h-[30rem]">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={response?.courseDetails?.thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-[50vw] rounded-lg h-[90%]"
              />
            </div>
            <div>
            <div
              className={`z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px] tracking-wider lg:text-left text-center">
                  {response?.courseDetails?.courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>
                <ul style={{ listStyle: 'none', padding: 0 }} >
                  {response?.courseDetails?.courseDescription.split('\n').map((line, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ marginRight: '0.5em' }}>{index + 1}.</span>
                      <span>{line.trim().substring(line.indexOf('.') + 1).trim()}</span>
                    </li>
                  ))}
                </ul>
              </p>
              
              <div>
                <p className="">
                  Created By {`${response?.courseDetails?.instructor?.firstName} ${response?.courseDetails?.instructor?.lastName}`}
                </p>
              </div>
              
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {response?.courseDetails?.price}
              </p>
              <button className="text-white uppercase tracking-wider bg-yellow-100 pt-2 pb-2 rounded-md font-bold text-xl" onClick={handleBuyCourse}>
                Buy Now
              </button>
              
            </div>
            </div>
          </div>
          
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
                <p className="text-3xl font-semibold uppercase tracking-wider">What you'll Learn?</p>
                <div className="mt-5">
                <ul style={{ listStyle: 'none', padding: 0 }} className="leading-relaxed">
                    {response?.courseDetails?.whatyouwilllearn.split('\n').map((line, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <span style={{ marginRight: '0.5em' }}>{index + 1}.</span>
                        <span>{line.trim().substring(line.indexOf('.') + 1).trim()}</span>
                    </li>
                    ))}
                </ul>
                </div>
          </div>

          {/* Course Content Section */}
          <div className="max-w-[830px] ">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold uppercase tracking-wider">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2 tracking-wide">
                  <span>
                    {response?.courseDetails?.courseContent.length} {`section(s)`}
                  </span>
                  
                </div>
                
              </div>
            </div>

            {/* Course Details Accordion */}
            

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    response?.courseDetails?.instructor.image
                      ? response?.courseDetails?.instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.courseDetails?.instructor.firstName} ${response?.courseDetails?.instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${response?.courseDetails?.instructor.firstName} ${response?.courseDetails?.instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {response?.courseDetails?.instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails