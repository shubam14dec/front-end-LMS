import React from 'react'
import HighlightText from '../components/core/Homepage/HighlightText'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'

const About = () => {
  return (
    <div>
        <section className="bg-richblack-700">
                <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
                    <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
                    Driving Innovation in Online Education for a
                    <HighlightText text={" Brighter Future"} />
                <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
                    Studynotion is at the forefront of driving innovation in online
                    education. We're passionate about creating a brighter future by
                    offering cutting-edge courses, leveraging emerging technologies,
                    and nurturing a vibrant learning community.
                </p>
                    </header>
                </div>
      </section>
      <div className='w-full'>
      <ContactFormSection/>
      </div>
    </div>
  )
}

export default About