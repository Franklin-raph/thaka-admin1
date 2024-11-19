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
        const res = await fetch(`${baseUrl}/admin/users/${id}`,{
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
      <UserInfoCard baseUrl={baseUrl} getCustomer={getCustomer} user={user} />
    </div>
  )
}

export default SingleCustomer