import React from 'react'
import Register from './pages/Register'
import SignIn from './pages/SigIn'
import { getCurrentUser } from './customHooks/getCurrentUser'
import ForgetPassword from './pages/ForgetPassword'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import CreateCourse from './pages/CreateCourse'
import { getAllCourses } from './customHooks/getAllCourses'
import { userCourses } from './customHooks/getuserCoursedata'
import UpdateCourse from './pages/UpdateCourse'
import CoursesPage from './pages/Courses'
import LecturePage from './pages/LecturePage'
import ViewCourse from './pages/ViewCourse'
import ViewAllLectures from './pages/AllLecture'
import AboutPage from './pages/AboutPage'
import SearchAi from './pages/SearchAi'

const App = () => {
getCurrentUser()
getAllCourses()
userCourses()

const{courseData}=useSelector(state=>state.course)
 const { userData, isLoading } = useSelector(state => state.user)

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<AboutPage/>}/>
    <Route path='/searchai' element={<SearchAi/>}/>
    <Route path='/courses' element={<CoursesPage/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to="/"/>}/>
    <Route path='/forgetpassword' element={!userData?<ForgetPassword/>:<Navigate to="/"/>}/>
    <Route path='/register' element={!userData?<Register/>:<Navigate to="/"/>}/>
    <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signin"/>}/>
    <Route path='/dashboard' element={userData?.role=="educator"?<Dashboard/>:<Navigate to="/"/>}/>
    <Route path='/createcourse' element={userData?.role=="educator"?<CreateCourse/>:<Navigate to="/"/>}/>
    <Route path='/updatecourse/:courseId' element={userData?.role=="educator"?<UpdateCourse/>:<Navigate to="/"/>}/>
    <Route path='/createlecture/:courseId' element={userData?.role=="educator"?<LecturePage/>:<Navigate to="/"/>}/>
    <Route path='/viewcourse/:courseId' element={<ViewCourse />} />
    <Route path='/lecture/:courseId' element={userData?<ViewAllLectures />:<Navigate to ="/"/>} />
  </Routes>
  )
}

export default App