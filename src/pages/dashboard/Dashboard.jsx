import React, { useEffect, useState } from 'react'
// import CustomerDropDown from '../../components/customer-drop-down/CustomerDropDown'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import { BiChevronDown } from 'react-icons/bi'

const Dashboard = ({baseUrl}) => {

  const filterArray = ['All', 'Inactive', 'Active']
  const [searchString, setSearchString] = useState('')
  const admin = JSON.parse(localStorage.getItem('admin'))
  const navigate = useNavigate()
  const [allCustomers, setAllCustomers] = useState([])
  const [countries, setCountries] = useState()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [dropDown, setDropDown] = useState(false)

  async function getAllCustomers(){
    const res = await fetch(`${baseUrl}/admin/users`,{
      headers:{
        Authorization:`Bearer ${admin.data.accessToken}`
      }
    })
    const data = await res.json()
    console.log(res, data);
    if(res.ok){
      setAllCustomers(data.data.users.reverse())
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

  const [pageNumber, setPageNumber] = useState(0)

  const usersPerPage = 20
  const visitedPages = pageNumber * usersPerPage

  const displayUsers = allCustomers
        .slice(visitedPages, visitedPages + usersPerPage)
        .filter((customer) => {
        if (searchString === "") return customer
        else if (customer.email.toLowerCase().includes(searchString.toLowerCase()) 
          || customer.email.toLowerCase().includes(searchString.toLowerCase()) 
          || customer.email.toLowerCase().includes(searchString.toLowerCase())) return customer
        })
        .map((customer, index) => {
            return(
              <tr class="bg-white border-b cursor-pointer" onClick={e => navigate(`/customer/${customer._id}`)}>
                {/* <td class="pl-3 pr-6 py-4">
                  {index + 1 }
                </td>
                <td class="pl-3 pr-6 py-4">
                  {customer.first_name} {customer.last_name}
                </td>
                <td class="px-6 py-4">
                  {new Date(customer.date_joined).toDateString()}
                </td>
                <td class="px-6 py-4">
                  {new Date(customer.last_seen).toDateString()}
                </td>
                <td class={`px-6 py-4 capitalize ${
                  customer.kyc_status === 'not_set' ? 'text-gray-500' :
                  customer.kyc_status === 'pending' ? 'text-yellow-500' :
                  customer.kyc_status === 'rejected' ? 'text-red-500' : 'text-green-500'
                }`}>
                  {customer.kyc_status}
                </td> */}
                <td class="px-6 py-4">
                  {index + 1}
                </td>
                <td class="px-6 py-4">
                  {customer?.fullname}
                </td>
                <td class="px-6 py-4">
                  {customer?.email}
                </td>
                <td class="px-6 py-4">
                  {customer?.userType}
                </td>
                <td class="px-6 py-4">
                  {customer?.isVerified.toString()}
                </td>
                <td class="px-6 py-4">
                  {customer?.businessAddress}
                </td>
                {/* <td class="px-6 py-4">
                  {customer?.phone}
                </td> */}
            </tr>
            )
        })

    const pageCount = Math.ceil(allCustomers.length / usersPerPage)

    const changePage  = ({selected}) => {
        setPageNumber(selected)
    }

    useEffect(() => {
      getAllContries()
    },[])

    async function getAllContries (){
      const res = await fetch('https://restcountries.com/v3.1/region/africa')
      const data = await res.json()
      setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)))
    }

  return (
    <div className='shadow bg-white rounded-[20px] p-[30px]'>
      <div className='flex items-center justify-between'>
        <p className='text-[#333333] text-[20px] font-[700]'>Users</p>
        <div className='flex items-center gap-5'>
          <div onClick={() => setDropDown(!dropDown)} className='flex items-center gap-2 border rounded-md px-2 py-1 cursor-pointer relative'>
            <p className='text-gray-500 text-[14px]'>{selectedCountry ? selectedCountry : 'Select country'}</p>
            <BiChevronDown className='text-[20px]'/>
            {
              dropDown &&
              <div className='absolute border w-full left-0 top-[36px] rounded-[5px] bg-white z-10 h-[500px] overflow-y-scroll'>
                {
                  countries?.map((country, index) => (
                    <p key={index} onClick={() => {
                      setSelectedCountry(country.name.common)
                      setDropDown(false)
                    }} className='text-[14px] p-2 cursor-pointer text-gray-500 hover:bg-gray-200'>{country.name.common}</p>
                  ))
                }
              </div>
            }
          </div>
          <input type="text" className='border w-[320px] py-1 rounded-md outline-none px-2' placeholder='Search Users' onChange={e => setSearchString(e.target.value)} />
        </div>
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg mt-9">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-[14px] text-[#5C5C5C] capitalize border-b">
                  <tr>
                      <th scope="col" class="pl-3 pr-6 py-3">
                          S/N
                      </th>
                      <th scope="col" class="pl-3 pr-6 py-3">
                          Full Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                          User Type
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Is Verified
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Business Addresss
                      </th>
                      {/* <th scope="col" class="px-6 py-3">
                          Phone
                      </th> */}
                  </tr>
              </thead>
              <tbody>
                {
                  displayUsers
                //   allCustomers && allCustomers.filter((customer) => {
                //     if (searchString === "") return customer
                //     else if (customer.first_name.toLowerCase().includes(searchString.toLowerCase()) 
                //               || customer.last_name.toLowerCase().includes(searchString.toLowerCase()) 
                //               || customer.last_name.toLowerCase().includes(searchString.toLowerCase())) return customer
                // }).map(customer => (
                //     // <tr class="bg-white border-b cursor-pointer" onClick={e => navigate(`/customer/${customer.id}`)}>
                //     //     <td class="pl-3 pr-6 py-4">
                //     //       {customer.first_name} {customer.last_name}
                //     //     </td>
                //     //     <td class="px-6 py-4">
                //     //       {new Date(customer.date_joined).toDateString()}
                //     //     </td>
                //     //     <td class="px-6 py-4">
                //     //       {new Date(customer.last_seen).toDateString()}
                //     //     </td>
                //     //     <td class={`px-6 py-4 capitalize ${
                //     //       customer.kyc_status === 'not_set' ? 'text-gray-500' :
                //     //       customer.kyc_status === 'pending' ? 'text-yellow-500' :
                //     //       customer.kyc_status === 'rejected' ? 'text-red-500' : 'text-green-500'
                //     //     }`}>
                //     //       {customer.kyc_status}
                //     //     </td>
                //     //     <td class="px-6 py-4">
                //     //       {customer.email}
                //     //     </td>
                //     //     <td class="px-6 py-4">
                //     //       {customer.phone}
                //     //     </td>
                //     // </tr>
                //   ))
                }
              </tbody>
          </table>
          <ReactPaginate
              previousLabel={'Prev'}
              nextLabel = {'Next'}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName='flex items-center gap-9 mt-5 justify-end pr-[30px] paginationBtns'
              activeClassName='bg-secondary-color text-white'
              disabledClassName='bg-gray-500 cursor-not-allowed'
          />
      </div>

    </div>
  )
}

export default Dashboard