import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { BsCart } from "react-icons/bs";
import Profiledropdown from '../core/auth/Profiledropdown'
import {useSelector} from "react-redux"
import { apiconnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { MdOutlineArrowDropDownCircle } from "react-icons/md";

const Navbar = () => {

    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems} = useSelector((state)=>state.cart);

    const location = useLocation(); 
    function matchRoute(route){
        return matchPath({path:route},location.pathname)
    }

    const [sublinks,setsublinks] = useState([]);

    const fetchsublinks = async()=>{
        try{
            const result = await apiconnector("GET",categories.CATEGORIES_API);
            console.log("printing sublinks result: ",result);
            setsublinks(result.data.alltags);
        }catch(error){
            console.log("could not fetch category details")
        }
    }

    useEffect(()=>{
            fetchsublinks();
    },[])

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            
            {/* Images */}
            <Link to={"/"}>
            <img src={logo} width={160} height={42} loading='lazy' />
            </Link>
        
            {/* nav links */}
             <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>{
                            return <li key={index}>
                                {
                                    link.title==="Catalog"?(
                                        <div className='group relative flex cursor-pointer items-center gap-1'>
                                           <p>{link.title}</p>
                                           <MdOutlineArrowDropDownCircle />

                                            <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[80%]
                                            flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                            opacity-0 transition-all duration-200 group-hover:visible
                                            group-hover:opacity-100 lg:w-[300px]'>
                                                <div className='absolute left-[50%] top-0 z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'>
                                                </div>
                                                {
                                                    sublinks.length?(
                                                        sublinks.map((sublink,index)=>(
                                                            <Link to={`/catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} key={index}>
                                                                <p>{sublink.name}</p>
                                                            </Link>
                                                        ))
                                                    ):(<div>No Categories</div>)
                                                }

                                            </div> 

                                        </div>
                                    ):(
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link.path)?"text-yellow-25"
                                                :"text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        })
                    }
                </ul>
             </nav>
                
            {/* login/signup */}

            <div className='flex gap-x-4 items-center'>
                {
                    user&&user?.accountType !=="Instructor"&&(
                        <Link to="/dashboard/cart" className='relative'>
                            <BsCart />
                            {
                                totalItems>0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token===null && (
                        <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[7px]
                        text-richblack-100 rounded-md'>
                            Log in
                        </button>
                        </Link>
                    )
                }

                {
                    token===null && (
                        <Link to="/signup">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[7px]
                        text-richblack-100 rounded-md'>
                            Signup
                        </button>
                        </Link>
                    )
                }

                {
                    token!==null && <Profiledropdown/>
                }

            </div>


        </div>
    </div>
  )
}

export default Navbar