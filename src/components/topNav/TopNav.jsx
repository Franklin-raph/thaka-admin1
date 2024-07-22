import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { PiSignOut } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';


const TopNav = () => {

  const admin = JSON.parse(localStorage.getItem('admin'))
  const navigate = useNavigate()

  console.log(admin.data);

  async function signOutAdmin(){
    localStorage.clear()
    sessionStorage.setItem("reloaded", "false");
    navigate('/')
    window.location.reload()
  }

  return (
    <div className='w-[85%] bg-white fixed shadow right-0 flex items-center justify-between py-[1rem] px-[3rem] z-[99]'>
      <p className='font-[500] text-[18px]'>Hello, {admin?.data?.payload?.email}</p>
      <div className='flex items-center'>
        <dvi className='p-3 cursor-pointer bg-primary-color text-white rounded-full' onClick={signOutAdmin}>
          <p className='flex items-center gap-2'>
            <PiSignOut />
            <p>Sign Out</p>
          </p>
        </dvi>
        {/* <div className='border border-[#CFCFCF] rounded-full flex items-center py-1 px-3'>
          <input type="text" className='outline-none'/>
          <IoSearchOutline />
        </div>
        <img src="./userimg.png" className='w-[40px] ml-7' alt="" /> */}
      </div>
    </div>
  )
}

export default TopNav