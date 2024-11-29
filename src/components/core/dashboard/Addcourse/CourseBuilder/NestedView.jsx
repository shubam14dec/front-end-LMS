import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { CiCirclePlus } from "react-icons/ci";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({handleChangeEditsectionName}) => {

    const {course}=useSelector((state)=>state.course);
    const {token}=useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubsection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const [confirmationModal,setConfirmationModal]=useState(null);
    
    
    const handleDeleteSection =async (sectionId)=>{
        const result = await deleteSection({
            sectionId,
            courseId:course._id,
            token,
        })
        if(result){
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection=async(subSectionId,sectionId)=>{
        const result = await deleteSubSection({
            subSectionId,sectionId,token
        });
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=>section._id===sectionId ? result:section)
            const updatedCourse = {...course,courseContent:updatedCourseContent}
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }
    // console.log("course",course)


  return (
    <div className='mt-6 mb-4 w-[80%]'>
        <div className='rounded-lg bg-richblack-700 p-6 px-8'>
            {course.courseContent.map((section)=>(
                <details key={section._id} open>
                    <summary className='flex items-center justify-between gap-x-3 border-b-2'>
                        <div className='flex items-center gap-x-3'>
                        <RxDropdownMenu />
                        <p className="text-richblack-5">{section.sectionName}</p>
                        </div>
                        <div className='flex items-center gap-x-3'>
                            <button
                            onClick={()=>handleChangeEditsectionName(section._id,section.sectionName)}
                            >
                            <MdModeEdit />
                            </button>
                            <button
                            onClick={()=>{
                                setConfirmationModal({
                                    text1:"Delete this section",
                                    text2:"All the lectures in this section will be deleted",
                                    btn1Text:"Delete",
                                    btn2Text:"Cancel",
                                    btn1Handler:()=>handleDeleteSection(section._id),
                                    btn2Handler:()=>setConfirmationModal(null)
                                })
                            }}>
                            <MdDelete />
                            </button>
                            <span>|</span>
                            <BiSolidDownArrow />
                        </div>
                    </summary>

                    <div>
                        {
                            section.subsection?.map((data)=>(
                                <div key={data._id}
                                onClick={()=>setViewSubSection(data)}
                                className='flex items-center justify-between gap-x-3 border-b-2'
                                >
                                    <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu />
                                    <p className="text-richblack-5">{data.title}</p>
                                    </div>

                                    <div className='flex items-center gap-x-3'
                                    onClick={(e)=>e.stopPropagation()}
                                    >
                                        <button
                                        onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                                        >
                                            <MdModeEdit />
                                        </button>
                                        <button
                                        onClick={()=>{
                                            setConfirmationModal({
                                                text1:"Delete this sub-section",
                                                text2:"lecture will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
                                                btn2Handler:()=>setConfirmationModal(null)
                                            })
                                        }}
                                        >
                                         <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                        <button onClick={()=>setAddSubsection(section._id)}
                        className='mt-4 flex items-center'>
                        <CiCirclePlus />
                        <p>Add Lecture</p>
                        </button>
                    </div>
                </details>
            ))}
        </div>
        {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <></>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal}/>
      ):(<div></div>)}
    </div>
  )
}

export default NestedView