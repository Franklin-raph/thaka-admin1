import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserInfoCard from '../../components/userInfoCard/UserInfoCard'

const SingleCustomer = ({baseUrl}) => {
    
    const { id } = useParams()
    const admin = JSON.parse(localStorage.getItem('admin'))
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getCustomer()
    }, [])

    async function getCustomer(){
        const res = await fetch(`https:tracabe.onrender.com/admin/users/${id}`,{
          headers:{
            Authorization:`Bearer ${admin.data.accessToken}`
          }
        })
        const data = await res.json()
        setUser(data.data.users)
        console.log(res, data.data.users);
        
    }

  return (
    <div>
      <UserInfoCard user={user} />
      {/* <h1>About {user?.fullname} </h1>
      <div className='flex items-center gap-3'>
        <p>Email:</p>
        <p>{user?.email}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p>Address:</p>
        <p>{user?.address}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p>Business Address:</p>
        <p>{user?.businessAddress}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p>LGA:</p>
        <p>{user?.lga}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p>Personal Address:</p>
        <p>{user?.personalAddress}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p>State:</p>
        <p>{user?.state}</p>
      </div>
      <div className='flex items-center gap-3'>
        <p>User Type:</p>
        <p>{user?.userType}</p>
      </div> */}
    </div>
  )
}

export default SingleCustomer