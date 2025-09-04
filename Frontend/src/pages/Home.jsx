import React from 'react'
import Navbar from '../components/Navbar'
import home from "../assets/home1.jpg"
import ai from "../assets/SearchAi.png"
import Logos from '../components/Logos'
import ExploreCourses from '../components/ExploreCourses'
import { FaGooglePlay } from "react-icons/fa6";
import CoursesGrid from '../components/courseGrid'
import { useNavigate } from 'react-router-dom'
import AboutPage from './AboutPage'
import Footer from '../components/Footer'



const Home = () => {
  const navigate=useNavigate()
  return (
    <div className='w-[100%] overflow-hidden'>
      <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
        <Navbar/>
        <img src={home} className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' alt="" />

        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-amber-50 font-bold text-[20px]'>Grow Your Skills to Advance</span>
        <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-amber-50 font-bold text-[20px]'>Your Career Path</span>
        <div className='absolute lg:top-[30%] to-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap'>
          <button onClick={()=>{
            navigate("/courses")
          }} className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black [10px] text-[18px] font-light flex gap-2 cursor-pointer hover:scale-105'>View All Courses<FaGooglePlay className='w-[25px] h-[25px] lg:fill-white fill-black'/></button>
          <button onClick={()=>{
            navigate("/searchai")
          }} className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:bg-white  bg-black lg:text-black [10px] text-[18px] text-white rounded font-light flex gap-2 cursor-pointer hover:scale-105'>Search With AI <img src={ai} className='w-[30px] h-[30px] rounded-full hidden lg:block' alt="" /></button>
        </div>
       
      </div>
     <Logos/>
     <ExploreCourses/>
     <CoursesGrid/>
     <AboutPage/>
     <Footer/>
    </div>
  )
}

export default Home