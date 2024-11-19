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
      const res = await fetch(`${baseUrl}/admin/resturants/${id}`,{
        headers:{
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      })
      const data = await res.json()
      setShop(data.data.resturant)
      console.log(res, data);
  }

  return (
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 my-4">
        <div className='flex items-center justify-between mb-6 border-b'>
          <h1 className="text-2xl font-bold text-gray-800">About {shop?.name}</h1>
        </div>
        <div className='grid gap-[10px]'>
          <p className='text-[#333333] text-[15px]'>Address: {shop?.address}</p>
          <p className='text-[#333333] text-[15px]'>Phone: {shop?.phone}</p>
          <p className='text-[#333333] text-[15px]'>Email: {shop?.email}</p>
          <div>
            <p className='text-[#333333] text-[15px]'>Location: </p>
            <p className='text-[#333333] text-[13px] my-1 ml-2'>Lat:{shop?.location?.lat}</p>
            <p className='text-[#333333] text-[13px] my-1 ml-2'>Long:{shop?.location?.long}</p>
          </div>
          {
            shop?.openingHours &&
            <div>
              <p className='text-[#333333] text-[15px] mb-1'>Opening Hours:</p>
              {shop?.openingHours.map(hour => (
                <p key={hour.day} className='text-[#333333] text-[13px] my-1 ml-2'>{hour.day}: {hour.open} - {hour.close}</p>
              ))}
            </div>
          }
          {
            shop?.cuisineType &&
            <div>
              <h2 className='text-[#333333] text-[15px] mb-1'>Cuisine Type:</h2>
              {shop?.cuisineType.map((item, i) => (
                <div key={item.id} className='flex items-center gap-3'>
                  <p className='text-[#333333] text-[15px] ml-2'>{i+1}:{item}</p>
                </div>
              ))}
            </div>
          }
          {/* <button className='text-[12px] bg-[#96BF46] py-1 px-2 rounded-full text-white' onClick={() => navigate(`/admin/resturants/${shop?.id}/edit`)}>Edit Shop</button> */}
        </div>
      </div>
  )
}

export default SingleShop