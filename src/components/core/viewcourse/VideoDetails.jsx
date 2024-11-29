import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Player } from 'video-react';
import IconBtn from '../../common/IconBtn';
import 'video-react/dist/video-react.css'; 

const VideoDetails = () => {

    const {courseId,sectionId,subsectionId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const token = useSelector((state)=>state.auth);
    const playerRef = useRef();
    const {courseSectionData,courseEntireData,completedLectures}=useSelector((state)=>state.viewCourse);

    const [videoData,setVideoData]=useState([]);
    const [videoEnded,setVideoEnded] =useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        ;(async ()=>{
            if(!courseSectionData.length)
                return;
            if(!courseId && !sectionId && !subsectionId){
                navigate("/dashboard/enrolled-courses");
            }
            else{
                const filteredData = courseSectionData.filter(
                    (course)=>course._id === sectionId
                )
                const filteredVideoData = filteredData?.[0]?.subsection.filter(
                    (data)=>data._id===subsectionId
                )
                setVideoData(filteredVideoData?.[0]);
                setVideoEnded(false);
            }
        })()
    },[courseSectionData,courseEntireData,location.pathname])

    const isFirstVideo = ()=>{
        const currentSectionIndex = courseSectionData.findIndex(
            (data)=>data._id === sectionId
        )
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
            (data)=>data._id===subsectionId
        )
        if(currentSectionIndex===0 && currentSubSectionIndex===0){
            return true
        }else{
            return false
        }
    }

    const isLastVideo=()=>{
        const currentSectionIndex = courseSectionData.findIndex(
            (data)=>data._id === sectionId
        )
        const noOfSubSections = courseSectionData[currentSectionIndex].subsection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
            (data)=>data._id===subsectionId
        )
        if(currentSectionIndex === courseSectionData.length-1 && currentSubSectionIndex=== noOfSubSections-1){
            return true;
        }
        else{
            return false;
        }
    }

    const goToNextVideo=()=>{
        const currentSectionIndex = courseSectionData.findIndex(
            (data)=>data._id === sectionId
        )
        const noOfSubSections = courseSectionData[currentSectionIndex].subsection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
            (data)=>data._id===subsectionId
        )
        if(currentSubSectionIndex!==noOfSubSections-1){
            const nextSubSectionId = courseSectionData[currentSectionIndex].subsection[currentSubSectionIndex+1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else{
            const nextSectionId = courseSectionData[currentSectionIndex+1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex+1].subsection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }
    const goToPrevVideo=()=>{
        const currentSectionIndex = courseSectionData.findIndex(
            (data)=>data._id === sectionId
        )
        const noOfSubSections = courseSectionData[currentSectionIndex].subsection.length;
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
            (data)=>data._id===subsectionId
        )
        if(currentSubSectionIndex!=0){
            const prevSubSectionId = courseSectionData[currentSectionIndex].subsection[currentSubSectionIndex-1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else{
            const prevSectionId = courseSectionData[currentSectionIndex-1]._id;
            const prevSubSectionLength=courseSectionData[currentSectionIndex-1].subsection.length;
            const prevSubSectionId = courseSectionData[currentSectionIndex-1].subsection[prevSubSectionLength-1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }
    



  return (
    <div className=''>
        {
            !videoData?(<div>
                        No Data Found
                        </div>)
                    :(
                        <div className='w-[85vw] relative'>
                            <Player
                        ref={playerRef}
                        aspectRatio='16:9'
                        playsInline
                        onEnded={()=>setVideoEnded(true)}
                        src={videoData.videoUrl}>
                        
                       
                        {
                            videoEnded && (
                                <div className="absolute top-[40%] right-[50%] z-10 flex flex-col gap-3 items-center">
                                    
                                    <div>
                                        <IconBtn
                                        disabled={loading}
                                        onClickHandler={()=>{
                                            if(playerRef.current){
                                                playerRef.current.seek(0);
                                                setVideoEnded(false);
                                            }
                                        }}
                                        text="Rewatch"
                                        customClasses="text-xl"/>  
                                    </div>
                                        <div className='flex gap-x-5'>
                                                {
                                                !isFirstVideo() && (
                                                    <button
                                                    disabled={loading}
                                                    onClick={goToPrevVideo}
                                                    className='blackButton'>
                                                        Prev
                                                    </button>
                                                )}
                                                {
                                                    !isLastVideo() && (
                                                        <button
                                                        disabled={loading}
                                                        onClick={goToNextVideo}
                                                        className='blackButton'>
                                                            Next
                                                        </button>
                                                    )
                                                }
                                        </div>

                                </div>
                            )
                        }
                        </Player>
                        </div>
                    )
        }

        <h1>
            {videoData?.title}
        </h1>
        <p>{videoData?.description}</p>
    </div>
  )
}

export default VideoDetails