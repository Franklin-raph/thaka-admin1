import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Orders = ({baseUrl}) => {

    const admin = JSON.parse(localStorage.getItem('admin'))
    const navigate = useNavigate()
    const [searchString, setSearchString] = useState('')
    const [allOrders, setAllOrders] = useState([])
    const [page, setPage] = useState('')

    useEffect(() => {
        getAllOrders()
    },[])
  
    async function getAllOrders(){
      const res = await fetch(`${baseUrl}/orders`,{
        headers:{
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      })
      const data = await res.json()
      console.log(data.data);
      if(res.ok){
        setAllOrders(data.data)
      }
      console.log(res, data);
    }


  return (
    <div className='shadow bg-white rounded-[20px] p-[30px]'>
        <div className='flex items-center justify-between'>
            <p className='text-[#333333] text-[20px] font-[700]'>Orders</p>
            <input type="text" className='border w-[320px] py-1 rounded-md outline-none px-2' placeholder='Search Orders' onChange={e => setSearchString(e.target.value)} />
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg mt-9">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-[14px] text-[#5C5C5C] capitalize border-b">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            S/N
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Order Number
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Delivery Location
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Total Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    // displayUsers
                allOrders && allOrders?.orders?.filter((order) => {
                    if (searchString === "") return order
                    else if (order.orderNumber.toLowerCase().includes(searchString.toLowerCase()) 
                            || order.deliveryLocation.toLowerCase().includes(searchString.toLowerCase()) 
                            || order.status.toLowerCase().includes(searchString.toLowerCase())) return order
                }).map((order, index) => (
                    <tr class="bg-white border-b cursor-pointer">
                        <td class="pl-3 pr-6 py-4">
                            {index + 1}
                        </td>
                        <td class="pl-3 pr-6 py-4">
                            {order.orderNumber}
                        </td>
                        <td class="px-6 py-4">
                            {order.deliveryLocation}
                        </td>
                        <td class="px-6 py-4">
                            {order.status}
                        </td>
                        <td class="px-6 py-4">
                            ₦{order.totalPrice.toFixed(2)}
                        </td>
                        <td class="px-6 py-4">
                            {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
        <div className='mt-5 text-[#5C5C5C] flex items-center justify-between'>
            <p>{allOrders?.pagination?.pageSize} showing out of {allOrders?.pagination?.totalOrders}</p>
            <div className='flex items-center gap-5'>
                <button>Prev</button>
                <button>Next</button>
            </div>
        </div>
    </div>
  )
}

export default Orders