import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const ProfileComponent = () => {
  const { Id } = useParams(); 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dateRegister, setDateRegister] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3002/users/user-info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userid: Id })
        });
    
        if (response.ok) {
          const userInfo = await response.json();
          setFullName(userInfo[4]);
          setEmail(userInfo[3]);
          setDateRegister(userInfo[7]);
          setAddress(userInfo[6]);
        } else {
          console.error('Failed to fetch user information');
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    if (Id) {
      fetchUserInfo();
    }
  }, [Id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3002/users/update-user/${Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          
          address
        }),
      });

      if (response.ok) {
        console.log('User updated successfully');
        alert('User updated successfully');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  return (
    <div className=" items-center " >
      <div className="bg-white max-w-screen-xl mx-auto max-h-screen overflow-y-auto shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
           Thông tin khách hàng
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Thông tin chi tiết và thông tin về người dùng.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Full Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field"
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Email Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                  />
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Registration Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="date_of_birth"
                    value={dateRegister}
                    className="input-field"
                  />
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <textarea
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input-field"
                  />
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-center px-4 py-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileComponent;
