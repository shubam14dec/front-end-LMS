import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({details,height}) => {
  return (
    <div>
        <Link to={`/courses/${details._id}`}>
            <div>
                <div>
                    <img
                        src={details.thumbnail}
                        alt='img'
                        className={`${height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div>
                        <p>{details.courseName}</p>
                        <div className='flex'>
                        <p className='text-yellow-25'>Instructor Name :- </p>
                        <p>&nbsp;{details.instructor.firstName} {details.instructor.lastName}</p>
                        </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CourseCard