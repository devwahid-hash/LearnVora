import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";

const Logos = () => {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px]'>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <MdCastForEducation className='h-[35px] w-[35px] fill-[#03394b]'/>  20k+ Online Courses</div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <SiOpenaccess  className='h-[35px] w-[35px] fill-[#03394b]'/>  Life time Acssess</div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <RiMoneyDollarBoxLine  className='h-[35px] w-[35px] fill-[#03394b]'/>  Value for Money</div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <BiSupport  className='h-[35px] w-[35px] fill-[#03394b]'/>  Life time Support</div>
        <div className='flex items-center justify-center gap-2 px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b]'>
          <FaUsers  className='h-[35px] w-[35px] fill-[#03394b]'/>  Community Access</div>

    </div>
  )
}

export default Logos