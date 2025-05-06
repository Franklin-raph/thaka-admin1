// UserInfoCard.jsx
import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useParams } from 'react-router-dom';

const UserInfoCard = ({ baseUrl, user, getCustomer }) => {

  const [modal, setModal] = useState('')
  const admin = JSON.parse(localStorage.getItem('admin'))
  const { id } = useParams()

  const handleVerification = async () => {
    try {
      const res = await fetch(`${baseUrl}/admin/users/${id}?isVerified=true`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      });

      if (res.ok) {
        getCustomer()
        alert('User verified successfully');
        setModal(false);
      } else {
        alert('Failed to verify user');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to verify user');
    }
  }

  const handleUnVerification = async () => {
    try {
      const res = await fetch(`${baseUrl}/admin/users/${id}?isVerified=false`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      });

      if (res.ok) {
        getCustomer()
        alert('User un-verified successfully');
        setModal(false);
      } else {
        alert('Failed to un-verify user');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to un-verify user');
    }
  }

  const handleAdminToggle = async (makeAdmin) => {
    try {
      const res = await fetch(`${baseUrl}/admin/users/${id}?isAdmin=${makeAdmin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${admin.data.accessToken}`
        }
      });

      if (res.ok) {
        getCustomer()
        alert(`User ${makeAdmin ? 'made admin' : 'removed from admin'} successfully`);
        setModal(false);
      } else {
        alert(`Failed to ${makeAdmin ? 'make admin' : 'remove admin'}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Failed to ${makeAdmin ? 'make admin' : 'remove admin'}`);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 my-4">
      <div className='flex items-center justify-between mb-6 border-b'>
        <h1 className="text-2xl font-bold text-gray-800">About {user?.fullname}</h1>
        {
          user?.isVerified ?
          <button className='text-[12px] bg-[#96BF46] py-1 px-2 rounded-full text-white' onClick={() => setModal('un-verify')}>Un-verify {user?.userType}</button>
          :
          <button className='text-[12px] bg-[#96BF46] py-1 px-2 rounded-full text-white' onClick={() => setModal('verify')}>Verify {user?.userType}</button>
        }
      </div>
      <div className="space-y-4">
        {[
          { label: 'Email', value: user?.email },
          { label: 'Address', value: user?.address },
          { label: 'Business Address', value: user?.businessAddress },
          { label: 'LGA', value: user?.lga },
          { label: 'Personal Address', value: user?.personalAddress },
          { label: 'State', value: user?.state },
          { label: 'User Type', value: user?.userType },
          { label: 'Is Verified', value: user?.isVerified?.toString() },
        ].map((item, index) => (
          <div key={index} className="flex items-start">
            <p className="w-[250px] font-semibold text-gray-700">{item.label}:</p>
            <p className="text-gray-800">{item.value || 'N/A'}</p>
          </div>
        ))}
        <div className="flex items-start">
          <p className="w-[250px] font-semibold text-gray-700">Is Admin:</p>
          <div className="flex items-center">
            <p className="text-gray-800 mr-3">{user?.isAdmin?.toString() || 'false'}</p>
            {user?.isAdmin ? 
              <button className='text-[12px] bg-[#FF6B6B] py-1 px-2 rounded-full text-white' onClick={() => setModal('remove-admin')}>
                Remove Sub Admin
              </button> : 
              <button className='text-[12px] bg-[#3E7BFA] py-1 px-2 rounded-full text-white' onClick={() => setModal('make-admin')}>
                Make Sub Admin
              </button>
            }
          </div>
        </div>
      </div>
      {
        modal === 'verify' &&
        <>
            <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
            <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center justify-between border-b pb-[5px]">
                    <p className="text-[22px] capitalize">Verify {user?.userType}</p>
                    <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                </div>
                <div className='text-center flex items-center justify-center flex-col'>
                    <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                    <div className='my-5'>
                        <p className='text-[#19201D] mb-4 capitalize'>Verify {user?.userType}</p>
                        <p className='text-[#828282] text-[14px]'>
                            Are you sure you want to verify this {user?.userType}?
                        </p>
                    </div>
                    <div className='flex items-center gap-5 mt-3 pb-5'>
                        <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setModal(false)}>Cancel</button>
                        <button className='bg-[#259a3c] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={handleVerification} >Yes, Verify</button>
                    </div>
                </div>
            </div>
        </>
      }
      {
        modal === 'un-verify' &&
        <>
            <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
            <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center justify-between border-b pb-[5px]">
                    <p className="text-[22px] capitalize">Un-Verify {user?.userType}</p>
                    <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                </div>
                <div className='text-center flex items-center justify-center flex-col'>
                    <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                    <div className='my-5'>
                        <p className='text-[#19201D] mb-4 capitalize'>Un-Verify {user?.userType}</p>
                        <p className='text-[#828282] text-[14px]'>
                            Are you sure you want to Un-verify this {user?.userType}?
                        </p>
                    </div>
                    <div className='flex items-center gap-5 mt-3 pb-5'>
                        <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setModal(false)}>Cancel</button>
                        <button className='bg-[#259a3c] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={handleUnVerification} >Yes, Un-Verify</button>
                    </div>
                </div>
            </div>
        </>
      }
      {
        modal === 'make-admin' &&
        <>
            <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
            <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center justify-between border-b pb-[5px]">
                    <p className="text-[22px] capitalize">Make Admin</p>
                    <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                </div>
                <div className='text-center flex items-center justify-center flex-col'>
                    <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                    <div className='my-5'>
                        <p className='text-[#19201D] mb-4 capitalize'>Make Admin</p>
                        <p className='text-[#828282] text-[14px]'>
                            Are you sure you want to make this user an admin?
                        </p>
                    </div>
                    <div className='flex items-center gap-5 mt-3 pb-5'>
                        <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setModal(false)}>Cancel</button>
                        <button className='bg-[#259a3c] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={() => handleAdminToggle(true)}>Yes, Make Admin</button>
                    </div>
                </div>
            </div>
        </>
      }
      {
        modal === 'remove-admin' &&
        <>
            <div className="h-full w-full fixed top-0 left-0 z-[99]" style={{ background:"rgba(14, 14, 14, 0.58)" }} onClick={() => setModal(false)}></div>
            <div className="bg-white w-[450px] fixed top-[50%] left-[50%] pt-[20px] px-[2rem] z-[100] pb-[20px]" style={{ transform: "translate(-50%, -50%)" }}>
                <div className="flex items-center justify-between border-b pb-[5px]">
                    <p className="text-[22px] capitalize">Remove Admin</p>
                    <IoCloseOutline fontSize={"20px"} cursor={"pointer"} onClick={() => setModal(false)}/>
                </div>
                <div className='text-center flex items-center justify-center flex-col'>
                    <img src="./images/logout-question.svg" alt="" className='mt-9'/>
                    <div className='my-5'>
                        <p className='text-[#19201D] mb-4 capitalize'>Remove Admin</p>
                        <p className='text-[#828282] text-[14px]'>
                            Are you sure you want to remove admin privileges from this user?
                        </p>
                    </div>
                    <div className='flex items-center gap-5 mt-3 pb-5'>
                        <button className='border-[#19201D] border px-5 py-2 rounded-[4px] text-[14px]' onClick={() => setModal(false)}>Cancel</button>
                        <button className='bg-[#FF6B6B] text-white px-5 py-2 rounded-[4px] text-[14px]' onClick={() => handleAdminToggle(false)}>Yes, Remove Admin</button>
                    </div>
                </div>
            </div>
        </>
      }
    </div>
  );
};

export default UserInfoCard;