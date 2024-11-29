import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import Codeblocks from '../components/core/Homepage/Codeblocks'
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningSection from '../components/core/Homepage/LearningSection';
import Instructor from "../assets/Images/Instructor.png"

const Home = () => {
  return (
    <div className='w-full flex items-center flex-col'>
        {/* Section 1 */}

        <div className='relative flex flex-col w-4/5 max-w-maxContent items-center text-white justify-center'>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold 
                transition-all duration-200 hover:scale-95 w-fit'>
                    <div className='flex gap-2 items-center px-10 py-[5px] rounded-full
                    transition-all duration-200 group-hover:bg-richblack-900'>
                        <p>Become an instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>
            <div className='text-center text-4xl font-semibold mt-6'>
                Empower your future with 
                <HighlightText text={" Coding skills"}/>
            </div>
            <div className='text-center w-[90%] mt-3 text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
            </div>
            <div className='flex gap-7 mt-8'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-12 shadow-blue-200'>
                <video muted loop autoPlay>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* code section 1 */}
            <div>
                <Codeblocks
                postion={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                    Unlock Your
                    <HighlightText text={" Coding potential "}/>
                    with our online courses
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                ctabtn1={
                    {
                        btnText:"Try it yourself",
                        linkto:"/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn more",
                        linkto:"/login",
                        active: false,
                    }
                }
                codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                codecolour={"text-yellow-25"}
               />
            </div>

            {/* code section 2 */}
            <div>
                <Codeblocks
                postion={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                    Start
                    <HighlightText text={" coding in seconds "}/>
                    </div>
                }
                subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                ctabtn1={
                    {
                        btnText:"Continue Lesson",
                        linkto:"/signup",
                        active:true,
                    }
                }
                ctabtn2={
                    {
                        btnText:"Learn more",
                        linkto:"/login",
                        active: false,
                    }
                }
                codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
                codecolour={"text-white"}
               />
            </div>


        </div>

        {/* Section 2 */}
                <div className='bg-pure-greys-5 text-richblack-700 w-full'>
                    <div className='homepage_bg h-[100px] pt-8'>
                        <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-4 mx-auto'>
                        <div className='flex gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center gap-3'>
                            <p>Explore full Catalog</p>
                            <FaArrowRight/>
                        </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                        Learn More
                        </CTAButton>
                        </div>
                        </div>
                    </div>

                    <div className='mx-auto w-4/5 max-w-maxContent flex flex-col items-center justify-between gap-7 mt-12'>
                        <div className='flex gap-5 justify-between'>
                            <div className='text-4xl font-semibold w-[45%]'>
                                Get the skills you need a
                                <HighlightText text={" Job that is in demand"}/>
                            </div>
                            <div className='w-[40%] flex flex-col gap-4'>
                                <div className='text-[16px]'>
                                The modern educational landscape dictates its own terms. Today, being a competitive specialist requires more than just professional skills.
                                </div>
                                <div className='flex'>
                                <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                                </div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>

                    <TimelineSection/>

                    <LearningSection/>
                </div>

        {/* Section 3 */}
            <div className='w-full bg-richblack-800 pt-10 flex justify-center pb-10'>
                <div className='w-4/5 flex gap-28'>
                    <div className='w-[50%]'>
                        <img src={Instructor}/>
                    </div>
                    <div className='flex flex-col gap-5 w-[50%] text-2xl justify-center'>
                        <div className='text-white'>
                        Become an
                        <HighlightText text={" Instructor"}/>
                        </div>
                        <div className='text-[16px] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </div>
                        <div className='flex'>
                        <CTAButton active={true} linkto={"/signup"}>Start Teaching Today</CTAButton>
                        </div>
                    </div>
                </div>
            </div>
        {/* Footer */}

    </div>
  )
}

export default Home