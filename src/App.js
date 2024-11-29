import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgetpassword from './pages/Forgetpassword';
import Updatepassword from './pages/Updatepassword';
import Verfiyemail from './pages/Verfiyemail';
import About from './pages/About';
import Myprofile from './components/core/dashboard/Myprofile';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/core/auth/PrivateRoute';
import Error from './pages/Error';
import Enrolledcourses from './components/core/dashboard/Enrolledcourses';
import Cart from "./components/core/dashboard/cart/index"
import { ACCOUNT_TYPE } from './utils/constants';
import { useSelector } from 'react-redux';
import Addcourse from './components/core/dashboard/Addcourse';
import Mycourses from './components/core/dashboard/Mycourses';
import Editcourses from './components/core/dashboard/Editcourses';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import Viewcourse from './pages/Viewcourse';
import VideoDetails from './components/core/viewcourse/VideoDetails';
import OpenRoute from './components/core/auth/OpenRoute';


function App() {
  const {user}=useSelector((state)=>state.profile);

  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/courses/:courseId' element={<CourseDetails/>}></Route>
      <Route path='/catalog/:catalogName' element={<Catalog/>}></Route>



      <Route path='/login' element={<OpenRoute><Login/></OpenRoute>}></Route>
      <Route path='/signup' element={<OpenRoute><Signup/></OpenRoute>}></Route>
      <Route path='/forgot-password' element={<OpenRoute><Forgetpassword/></OpenRoute>}></Route>
      <Route path='/update-password/:id' element={<OpenRoute><Updatepassword/></OpenRoute>}></Route>
      <Route path='/verify-email' element={<OpenRoute><Verfiyemail/></OpenRoute>}></Route>
 
      <Route  element={
                  <PrivateRoute>
                    <Dashboard/>
                  </PrivateRoute>
                  }>
            <Route path='/dashboard/my-profile' element={<Myprofile/>}></Route>
            {/* <Route path='/dashboard/settings' element={<Setting/>}></Route> */}
            

            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path='/dashboard/enrolled-courses' element={<Enrolledcourses/>}></Route>
                <Route path='/dashboard/cart' element={<Cart/>}></Route>
              </>
              )
            }
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                <Route path='/dashboard/add-course' element={<Addcourse/>}></Route>
                <Route path='/dashboard/my-courses' element={<Mycourses/>}></Route>
                {/* <Route path='/dashboard/edit-course/:courseId' element={<Editcourses/>}></Route> */}
              </>
              )
            }


      </Route>

      <Route element={
        <PrivateRoute>
          <Viewcourse/>
        </PrivateRoute>
      }>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subsectionId' element={<VideoDetails/>}></Route>
                </>
              )
            }

      </Route>


      <Route path='*' element={<Error/>}></Route>

     </Routes>
    </div>
  );
}

export default App;
