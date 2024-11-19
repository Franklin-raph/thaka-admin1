import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SingleShop = ({baseUrl}) => {

  const { id } = useParams()
  const admin = JSON.parse(localStorage.getItem('admin'))
  const [shop, setShop] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    getShop()
  }, [])

  async function getShop(){
      const res = await fetch(`${baseUrl}/admin/users/${id}`,{
        headers:{
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      })
      const data = await res.json()
      setShop(data.data)
      console.log(res, data);
  }

  return (
    <div>SingleShop</div>
  )
}

export default SingleShop