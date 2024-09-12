import React, { useEffect, useState } from 'react'
// import CustomerDropDown from '../../components/customer-drop-down/CustomerDropDown'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const Shops = ({baseUrl}) => {


  const filterArray = ['All', 'Inactive', 'Active']
  const [searchString, setSearchString] = useState('')
  const admin = JSON.parse(localStorage.getItem('admin'))
  const navigate = useNavigate()
  const [allCustomers, setAllCustomers] = useState([])

  async function getAllCustomers(){
    const res = await fetch(`https:tracabe.onrender.com/admin/resturants`,{
      headers:{
        Authorization:`Bearer ${admin.data.accessToken}`
      }
    })
    const data = await res.json()
    console.log(data);
    if(res.ok){
      setAllCustomers(data.data.resturants.reverse())
    }
    console.log(res, data);
  }

  console.log(allCustomers);

  // useEffect(() =>{
  //   if(!admin){
  //     navigate('/admin-login')
  //   }
  //   getAllCustomers()
  // },[])

  useEffect(() => {
    // Ensure user is logged in
    getAllCustomers()
    if (!admin) {
      navigate('/');
      return;
    }
  }, []);

  return (
    <div className='shadow bg-white rounded-[20px] p-[30px]'>
        <div className='flex items-center justify-between'>
            <p className='text-[#333333] text-[20px] font-[700]'>Shops</p>
            <input type="text" className='border w-[320px] py-1 rounded-md outline-none px-2' placeholder='Search Shops'/>
        </div>
        <div class="relative overflow-x-auto sm:rounded-lg mt-9">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-[14px] text-[#5C5C5C] capitalize border-b">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    // displayUsers
                  allCustomers && allCustomers.filter((customer) => {
                    if (searchString === "") return customer
                    else if (customer.name.toLowerCase().includes(searchString.toLowerCase()) 
                              || customer.address.toLowerCase().includes(searchString.toLowerCase()) 
                              || customer.phone.toLowerCase().includes(searchString.toLowerCase())) return customer
                  }).map(customer => (
                    <tr class="bg-white border-b cursor-pointer" onClick={e => navigate(`/customer/${customer.id}`)}>
                        <td class="pl-3 pr-6 py-4">
                          {customer.name}
                        </td>
                        <td class="px-6 py-4">
                          {customer.email}
                        </td>
                        <td class="px-6 py-4">
                          {customer.address}
                        </td>
                        <td class="px-6 py-4">
                          {customer.phone}
                        </td>
                        <td class="px-6 py-4">
                          {customer.completed.toString()}
                        </td>
                    </tr>
                  ))
                }
                </tbody>
            </table>
        </div>
    </div>

  )
}

export default Shops