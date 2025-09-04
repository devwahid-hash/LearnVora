import React from 'react'
import { FaGooglePlay } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { TbBrandOpenai } from "react-icons/tb";
import { SiGoogledataproc } from "react-icons/si";
import { SiOpenaigym } from "react-icons/si";
import { TbDatabaseDollar } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';


const ExploreCourses = () => {
  const navigate=useNavigate()
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px]'>
      {/*left top dev */}
      <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-center justify-center gap-1 md:px-[40px] px-[20px]'>
             <span className='text-[35px] font-semibold'>Explore</span>
             <span className='text-[35px] font-semibold'>Our Courses</span>
             <p className='text-[17px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quidem fugit, dicta, maxime saepe eum earum possimus aperiam natus, repudiandae odio! Quos hic totam eius ut vero. Tenetur, deleniti perspiciatis.</p>
             <button onClick={()=>{
              navigate("/courses")
             }} className='px-[20px] py-[10px] border-2 bg-black border-white text-white rounded-[10px] text-[18px] font-light flex gap-2 mt-[40px] cursor-pointer'> Explore Corsess <FaGooglePlay className='w-[25px] h-[25px] fill-white'/></button>
      </div>
      {/*right bottom div */}
      <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px]  flex-wrap mb-[50px] lg:mb-[0px]'>
        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col  gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '>
                <TbDeviceDesktopAnalytics className='w-[60px] h-[60px] text-[#6d6c6c]'/>
                </div>
                web Dev
                </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#69dfbc] rounded-lg flex items-center justify-center '>
                <LiaUikit  className='w-[60px] h-[60px] text-[#6d6c6c]'/>
                </div>
               Ui/Ux desgining
                </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fcb9c8] rounded-lg flex items-center justify-center '>
                <MdAppShortcut className='w-[60px] h-[60px] text-[#6d6c6c]'/>
                </div>
                App Dev
                </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbfad9] rounded-lg flex items-center justify-center '>
                <TbDatabaseDollar   className='w-[60px] h-[60px] text-[#6d6c6c]'/>
                </div>
               DataBase
                </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#9795c3] rounded-lg flex items-center justify-center '>
                <TbBrandOpenai  className='w-[55px] h-[55px] text-[#6d6c6c]'/>
                </div>
                Ai Ml 
                </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#fbd9fb] rounded-lg flex items-center justify-center '>
                <SiGoogledataproc className='w-[55px] h-[55px] text-[#6d6c6c]'/>
                </div>
                Data Science 
                </div>

        <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#eca498] rounded-lg flex items-center justify-center '>
                <SiOpenaigym className='w-[50px] h-[50px] text-[#6d6c6c]'/>
                </div>
                Ai Tools
                </div>

                  <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
            <div className='w-[100px] h-[90px] bg-[#c26ac2] rounded-lg flex items-center justify-center '>
                <FaHackerrank className='w-[60px] h-[60px] text-[#6d6c6c]'/>
                </div>
                Ethical Hacking
                </div>
      </div>
    </div>
  )
}

export default ExploreCourses