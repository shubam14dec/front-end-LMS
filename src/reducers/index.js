import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../slices/authslice"
import profileReducer from "../slices/profileslice"
import cartReducer from "../slices/cartSlice"
import courseReducer from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"

const rootReducer = combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
})

export default rootReducer;
