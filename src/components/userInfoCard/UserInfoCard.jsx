// UserInfoCard.jsx
import React from 'react';

const UserInfoCard = ({ user }) => {
  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 my-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">About {user?.fullname}</h1>
      <div className="space-y-4">
        {[
          { label: 'Email', value: user?.email },
          { label: 'Address', value: user?.address },
          { label: 'Business Address', value: user?.businessAddress },
          { label: 'LGA', value: user?.lga },
          { label: 'Personal Address', value: user?.personalAddress },
          { label: 'State', value: user?.state },
          { label: 'User Type', value: user?.userType },
          { label: 'Is Verified', value: user?.isVerified.toString() },
        ].map((item, index) => (
          <div key={index} className="flex items-start">
            <p className="w-[250px] font-semibold text-gray-700">{item.label}:</p>
            <p className="text-gray-800">{item.value || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfoCard;
