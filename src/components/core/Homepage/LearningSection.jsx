import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from './CTAButton'

const LearningSection = () => {
  return (
    <div className='w-full flex justify-center mt-20 mb-16'>
        <div className='w-4/5 flex flex-col gap-7 items-center'>
            <div className='font-semibold text-4xl'>
            Your swiss knife for
            <HighlightText text={" learning any language"}/>
            </div>
            <div className='text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className="flex items-center justify-center mt-8">
              <img
                src={Know_your_progress}
                alt=""
                className="w-[30%]"
              />
              <img
                src={Compare_with_others}
                alt=""
                className="w-[33%]"
              />
              <img
                src={Plan_your_lessons}
                alt=""
                className="w-[35%]"
              />
            </div>
            <div>
              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningSection