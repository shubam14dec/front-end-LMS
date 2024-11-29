import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from '../../../../slices/cartSlice';
import ReactStars from "react-rating-stars-component"

const RenderCartCourses = () => {
    const {cart} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
  return (
    <div>
        {
            cart.map((course,index)=>(
                <div key={index}>
                    <div>
                        <img src={course.thumbnail} alt='image1'/>
                        <div>
                            <p>{course.courseName}</p>
                            <p>{course.category.name}</p>
                            <div>
                                <span>4.8</span>
                                <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<MdOutlineStarBorderPurple500 />}
                                fullIcon={<MdOutlineStarBorderPurple500 />}
                                />
                                <span>{course.ratingAndReviews.length} Ratings</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={()=>dispatch(removeFromCart(course._id))}>
                                <MdDelete />
                                <span>Remove</span>
                        </button>
                        <p>Rs {course.price}</p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default RenderCartCourses