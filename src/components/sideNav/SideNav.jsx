import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CiUser, CiShop } from "react-icons/ci";
import { TiDocumentText } from 'react-icons/ti';
import { PiNotification } from "react-icons/pi";
import { TbSettings2 } from "react-icons/tb";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineDirectionsBike, MdRequestQuote } from 'react-icons/md';

const SideNav = () => {

  const navigate = useNavigate()
  const location = useLocation()

  async function signOutAdmin(){
    localStorage.clear()
    sessionStorage.setItem("reloaded", "false");
    navigate('/')
    window.location.reload()
  }

  console.log(location.pathname);

  return (
    <div className='bg-[#003C2F] w-[15%] h-[100dvh] fixed overflow-y-auto'>
      <h1 className='text-white text-[32px] text-center font-[700] my-5'>Admin</h1>
      <ul className='text-white'>
        <li className={location.pathname.includes("/users") || location.pathname === '/' || location.pathname.includes('customer') ? `bg-secondary-color py-3 pl-3` : `py-3 pl-3`}>
          <Link to="/users" className='flex items-center gap-3'>
            <CiUser fontSize={"22px"}/>
            <p>Users</p>
          </Link>
        </li>
        <li className={location.pathname.includes("/shop") ? `bg-secondary-color py-3 pl-3` : `py-3 pl-3`}>
          <Link to="/shops" className='flex items-center gap-3'>
            <CiShop fontSize={"22px"}/>
            <p>Shops</p>
          </Link>
        </li>
        <li className={location.pathname.includes("/riders") ? `bg-secondary-color py-3 pl-3` : `py-3 pl-3`}>
          <Link to="/riders" className='flex items-center gap-3'>
            <MdOutlineDirectionsBike fontSize={"22px"}/>
            <p>Riders</p>
          </Link>
        </li>
        <li className={location.pathname === "/transactions" ? `bg-secondary-color py-3 pl-3` :`py-3 pl-3`}>
          <Link to="/transactions" className='flex items-center gap-4'>
            <TiDocumentText />
            <p>Transactions</p>
          </Link>
        </li>
        <li className={location.pathname === "/orders" ? `bg-secondary-color py-3 pl-3` :`py-3 pl-3`}>
          <Link to="/orders" className='flex items-center gap-4'>
            <MdRequestQuote />
            <p>Orders</p>
          </Link>
        </li>
        <li className={location.pathname === "/settings" ? `bg-secondary-color py-3 pl-3` :`py-3 pl-3`}>
          <Link to="/settings" className='flex items-center gap-4'>
            <TbSettings2 />
            <p>Settings</p>
          </Link>
        </li>
        <li className='py-3 pl-3 cursor-pointer' onClick={signOutAdmin}>
          <p className='flex items-center gap-4'>
            <PiSignOut />
            <p>Sign Out</p>
          </p>
        </li>
      </ul>
    </div>
  )
}

export default SideNav