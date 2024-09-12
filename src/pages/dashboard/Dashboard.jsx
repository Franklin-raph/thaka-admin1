import React, { useEffect, useState } from 'react'
// import CustomerDropDown from '../../components/customer-drop-down/CustomerDropDown'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

const Dashboard = ({baseUrl}) => {

  const filterArray = ['All', 'Inactive', 'Active']
  const [searchString, setSearchString] = useState('')
  const admin = JSON.parse(localStorage.getItem('admin'))
  const navigate = useNavigate()
  const [allCustomers, setAllCustomers] = useState([])

  async function getAllCustomers(){
    const res = await fetch(`https:tracabe.onrender.com/admin/users`,{
      headers:{
        Authorization:`Bearer ${admin.data.accessToken}`
      }
    })
    const data = await res.json()
    console.log(data.data.users);
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
                  {customer?.email}
                </td>
                <td class="px-6 py-4">
                  {customer?.userType}
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

  return (
    <div className='shadow bg-white rounded-[20px] p-[30px]'>
      <div className='flex items-center justify-between'>
        <p className='text-[#333333] text-[20px] font-[700]'>Users</p>
        <input type="text" className='border w-[320px] py-1 rounded-md outline-none px-2' placeholder='Search Users' onChange={e => setSearchString(e.target.value)} />
      </div>

      <div class="relative overflow-x-auto sm:rounded-lg mt-9">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-[14px] text-[#5C5C5C] capitalize border-b">
                  <tr>
                      {/* <th scope="col" class="pl-3 pr-6 py-3">
                          S/N
                      </th>
                      <th scope="col" class="pl-3 pr-6 py-3">
                          Users
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Creation Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Last Visited
                      </th> */}
                      <th scope="col" class="px-6 py-3">
                          Email
                      </th>
                      <th scope="col" class="px-6 py-3">
                          User Type
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