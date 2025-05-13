import React, { useEffect, useState } from 'react'
import UserInfoCard from '../../components/userInfoCard/UserInfoCard'

const Settings = ({baseUrl}) => {

  const tabs = ["My Profile", "Change Password"]
  const [selectedTab, setSelectedTab] = useState(tabs[0])
  const admin = JSON.parse(localStorage.getItem('admin'))
  const [user, setUser] = useState()

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
      getUser()
  }, [])

  async function getUser(){
    console.log(admin.data.payload);
    
      const res = await fetch(`${baseUrl}/admin/users/${admin.data.payload._id}`,{
        headers:{
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      })
      const data = await res.json()
      setUser(data.data.users)
      console.log(res, data.data.users);
  }

  async function savePassword () {
    if(!oldPassword || !newPassword || !confirmPassword){
      alert('Please fill in all the fields')
    }else{
      
    }
  }

  return (
    <div>
      <div className='flex items-center gap-6 font-[500] text-gray-500 ml-6'>
        {tabs.map(tab => (
          <p onClick={() => setSelectedTab(tab)} className={ selectedTab === tab ? 'text-gray-900 cursor-pointer' : 'text-gray-500 cursor-pointer'}>{tab}</p>
        ))}
      </div>
      {
        selectedTab === "My Profile" &&
        <UserInfoCard baseUrl={baseUrl} getUser={getUser} user={user} />
      }
      {
        selectedTab === "Change Password" &&
        <div className='ml-5 mt-10 w-[30%]'>
          <div className='w-full'>
            <p>Current Password</p>
            <input onChange={e => setOldPassword(e.target.value)} type="password" placeholder='****' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
          </div>
          <div className='w-full my-5'>
            <p>New Password</p>
            <input onChange={e => setNewPassword(e.target.value)} type="password" placeholder='****' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
          </div>
          <div className='w-full'>
            <p>Confirm Password</p>
            <input onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder='****' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
          </div>
          <button onClick={savePassword} className='bg-primary-color py-2 mt-3 w-full text-white rounded'>Save Changes</button>
        </div>
      }
    </div>
  )
}

export default Settings