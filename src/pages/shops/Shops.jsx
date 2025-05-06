import React, { useEffect, useState } from 'react'
// import CustomerDropDown from '../../components/customer-drop-down/CustomerDropDown'
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import { BiChevronDown } from 'react-icons/bi'

const Shops = ({baseUrl}) => {


  const filterArray = ['All', 'Inactive', 'Active']
  const [searchString, setSearchString] = useState('')
  const admin = JSON.parse(localStorage.getItem('admin'))
  const navigate = useNavigate()
  const [allShops, setAllShops] = useState([])
  const [countries, setCountries] = useState()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [dropDown, setDropDown] = useState(false)

  async function getAllShops(){
    const res = await fetch(`https://tracabe.onrender.com/admin/resturants`,{
      headers:{
        Authorization:`Bearer ${admin.data.accessToken}`
      }
    })
    const data = await res.json()
    console.log(data);
    if(res.ok){
      setAllShops(data.data.resturants.reverse())
    }
    console.log(res, data);
  }

  console.log(allShops);

  // useEffect(() =>{
  //   if(!admin){
  //     navigate('/admin-login')
  //   }
  //   getAllCustomers()
  // },[])

  useEffect(() => {
    // Ensure user is logged in
    getAllShops()
    if (!admin) {
      navigate('/');
      return;
    }
  }, []);

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
            <p className='text-[#333333] text-[20px] font-[700]'>Shops</p>
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
                <input type="text" className='border w-[320px] py-1 rounded-md outline-none px-2' placeholder='Search Shops' onChange={e => setSearchString(e.target.value)} />
            </div>
            {/* <input type="text" className='border w-[320px] py-1 rounded-md outline-none px-2' placeholder='Search Shops'/> */}
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
                            Completed
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    // displayShops
                  allShops && allShops.filter((shop) => {
                    if (searchString === "") return shop
                    else if (shop.name.toLowerCase().includes(searchString.toLowerCase()) 
                              || shop.address.toLowerCase().includes(searchString.toLowerCase()) 
                              || shop.phone.toLowerCase().includes(searchString.toLowerCase())) return shop
                  }).map((shop, index) => (
                    <tr class="bg-white border-b cursor-pointer" onClick={e => navigate(`/shop/${shop._id}`)}>
                        <td class="pl-3 pr-6 py-4">
                          {shop.name}
                        </td>
                        <td class="px-6 py-4">
                          {shop.email}
                        </td>
                        <td class="px-6 py-4">
                          {shop.address}
                        </td>
                        <td class="px-6 py-4">
                          {shop.phone}
                        </td>
                        <td class="px-6 py-4">
                          {shop.completed.toString()}
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