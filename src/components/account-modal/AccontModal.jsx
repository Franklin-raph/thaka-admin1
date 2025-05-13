import React, { useState } from 'react'

const AccontModal = ({setAccountModal}) => {

    const [bankName, setBankName] = useState('')
    const [accountName, setAccountName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [country, setCountry] = useState('')

    async function saveBank () {
        if(!bankName || !accountName || !accountNumber || !country){
            alert("Please fill in the fields")
        }else{

        }
    }

  return (
    <div>
        <div className="h-full w-full fixed top-0 left-0 z-[99] bg-opacity-70 backdrop-blur-sm" style={{ background:"rgba(14, 14, 14, 0.58)" }} ></div>
        <div className="bg-white fixed top-[50%] left-[50%] p-[20px] z-[100] rounded-[8px] w-[400px]" style={{ transform: "translate(-50%, -50%)" }}>
            <img src="./warning.svg" alt="" />
            <p className="text-[#101828] font-[600] tex-[22px] my-3 text-left">Add new bank account</p>
            <div>
                <div className='w-full'>
                    <p>Bank Name</p>
                    <input onChange={e => setBankName(e.target.value)} type="text" placeholder='Zenith Bank' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
                </div>
                <div className='w-full my-5'>
                    <p>Account Name</p>
                    <input onChange={e => setAccountName(e.target.value)} type="text" placeholder='John Doe' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
                </div>
                <div className='w-full'>
                    <p>Account Number</p>
                    <input onChange={e => setAccountNumber(e.target.value)} type="text" placeholder='1234567890' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
                </div>
                <div className='w-full my-5'>
                    <p>Country</p>
                    <input onChange={e => setCountry(e.target.value)} type="text" placeholder='Nigeria' className='px-3 bg-transparent w-full border outline-none py-[6px] rounded mt-1'/>
                </div>
            </div>
            {/* <p className="text-[#475467] text-[15px]">Are you sure you want to logout of this account? you can login back to your account anytime.</p> */}
            <div className="flex items-center justify-between gap-5 mt-6">
                <button className="text-[#344054] border border-[#D0D5DD] py-[7px] rounded-[4px] w-full" onClick={() => setAccountModal('')}>Cancel</button>
                <button onClick={saveBank} className="text-[#fff] border border-primary-color bg-primary-color py-[7px] rounded-[4px] w-full">Save</button>
            </div>
        </div>
    </div>
  )
}

export default AccontModal