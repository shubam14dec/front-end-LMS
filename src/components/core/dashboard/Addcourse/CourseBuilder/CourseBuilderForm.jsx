import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import { CiCirclePlus } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from "react-icons/fa6";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import NestedView from './NestedView';



const CourseBuilderForm = () => {
    const {register,handleSubmit,setValue,formState:{errors}} = useForm();
    const[editSectionName,seteditSectionName] = useState(null);
    const {course}=useSelector((state)=>state.course);
    const {token}= useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [loading,setloading] = useState(false);

    const cancelEdit=()=>{
        seteditSectionName(null);
        setValue("sectionName","");
    }
    

    const goback=()=>{
        dispatch(setStep(1));
        dispatch(setEditCourse(true))
    }
    const gotonext=()=>{
        console.log("reached gotonext");
        if(course.courseContent.length === 0){
            toast.error("Please add atleast one Section");
            return
        }
        if(course.courseContent.some((section)=>section.subsection.length===0)){
            toast.error("Please add atleast one lecture in each Section");
            return
        }
        dispatch(setStep(3));
    }

    const onSubmit = async(data)=>{
        setloading(true);
        let result;
        if(editSectionName){
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId : editSectionName,
                    courseId:course._id,
                },token)
        }
        else{
            result = await createSection({
                sectionName: data.sectionName,
                courseId:course._id,
            },token)
        }
        if(result){
            dispatch(setCourse(result));
            seteditSectionName(null);
            setValue("sectionName","")
        }
        setloading(false);
    }

    const handleChangeEditsectionName=(sectionId,sectionName)=>{
        if(editSectionName === sectionId){
            console.log("45")
            cancelEdit();
            return;
        }
        seteditSectionName(sectionId);
        setValue("sectionName",sectionName);   
    }

  return (
    <div className='text-richblack-5'>
        <p>Course Builder</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='sectionName'>Section name <sup>*</sup></label>
                <input  
                id='sectionName'
                placeholder='Add section name'
                {...register("sectionName",{required:true})}
                />
                {errors.sectionName &&(
                    <span>Section name is required</span>
                )}
            </div>
            <div className='mt-5 flex '>
                <IconBtn
                type="submit"
                text={editSectionName?"Edit section name":"Create Section"}
                outline={true}
                customClasses={"text-white"}
                >
                    <CiCirclePlus />
                </IconBtn>
                {editSectionName &&(
                    <button
                    type='button'
                    onClick={cancelEdit}
                    className='text-sm text-richblack-300 underline ml-4'
                    >
                        Cancel Edit
                    </button>
                )}
            </div>
        </form>
            {course.courseContent.length >0 && (
                <div className='flex justify-center w-full'>
                    <NestedView handleChangeEditsectionName={handleChangeEditsectionName}/>
                </div>
                
            )}
            <div className='flex justify-end gap-x-3'>
                <button onClick={goback} className='rounded-md cursor-pointer flex items-center'>
                    Back
                </button>
                <IconBtn text="Next" onClickHandler={gotonext}>
                <FaArrowRight />
                </IconBtn>
            </div>

    </div>
  )
}

export default CourseBuilderForm