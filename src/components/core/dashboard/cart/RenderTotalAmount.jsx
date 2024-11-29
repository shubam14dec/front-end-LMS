import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {
    const {total,cart}=useSelector((state)=>state.cart);

    function handlebuycourse(){
        const courses=cart.map((course)=>course._id);
        console.log("Bought these courses:",courses);
        // API integration of payment gateway
    }

  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>
        <IconBtn
            text="Buy Now"
            onClickHandler={handlebuycourse}
            customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderTotalAmount