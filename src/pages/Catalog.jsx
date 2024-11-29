import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiconnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseCard from '../components/core/catalog/CourseCard';

const Catalog = () => {
    const { catalogName } = useParams()
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")
  
    useEffect(() => {
      ; (async () => {
        try {
          const res = await apiconnector("GET", categories.CATEGORIES_API)
          
          const category_id = res?.data?.alltags?.filter(
            (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
          )[0]._id
          setCategoryId(category_id)
        } catch (error) {
          console.log("Could not fetch Categories.", error)
        }
      })()
    }, [catalogName])
    useEffect(() => {
      if (categoryId) {
        ; (async () => {
          try {
            const res = await getCatalogPageData(categoryId)
            console.log(res)
            setCatalogPageData(res)
          } catch (error) {
            console.log(error)
          }
        })()
      }
    }, [categoryId])
  
 
    
  
    return (
      <>
        {/* Hero Section */}
        <div className=" box-content bg-richblack-800 px-4">
          <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
            <p className="text-sm text-richblack-300">
              {`Home / Catalog / `}
              <span className="text-yellow-25">
                {catalogPageData?.selectedCategory?.name}
              </span>
            </p>
            <p className="text-3xl text-richblack-5">
              {catalogPageData?.selectedCategory?.name}
            </p>
            <p className="max-w-[870px] text-richblack-200">
              {catalogPageData?.selectedCategory?.description}
            </p>
          </div>
        </div>
        <div className='flex justify-center mt-5'>
                <div className='text-richblack-25 w-[80%] flex flex-col'>
                    <div className='text-2xl font-bold'>Course to get you started with</div>
                    <div className='mt-4 grid grid-cols-1 lg:grid-cols-3 gap-8'>
                            {
                                catalogPageData?.selectedCategory?.course.map((cou,index)=>(
                                    <CourseCard details={cou} key={index} height={"h-[200px]"}/>
                                ))
                            }
                    </div>
                    
                </div>
        </div>
  
      </>
    )
}

export default Catalog