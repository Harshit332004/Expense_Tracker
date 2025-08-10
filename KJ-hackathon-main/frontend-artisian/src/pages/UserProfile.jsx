import React, { useState } from 'react';
import Navbar from '@/components/Navbar';


const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('userInfo');
  const [userInfo, setUserInfo] = useState({
    name: 'Sara',
    fullName: 'Tancredi',
    email: 'Sara.Tancredi@gmail.com',
    phone: '(+98) 912373167',
    location: 'New York, USA',
    postalCode: '23728167'
  });
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderUserInfo = () => (
    <div className="grid grid-cols-2 gap-4">
      {Object.entries(userInfo).map(([key, value]) => (
        <div key={key}>
          <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
          <p className="font-medium">{value}</p>
        </div>
      ))}
    </div>
  );

  const renderPreviousOrders = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Order #{order}</h3>
          <p>Date: 2023-0{order}-01</p>
          <p>Total: ${order}00.00</p>
        </div>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2].map((review) => (
        <div key={review} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold">Product Name {review}</h3>
          <p>Rating: {'⭐'.repeat(review + 3)}</p>
          <p>Great product! Would definitely recommend.</p>
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <form onSubmit={(e) => {
      e.preventDefault();
    }} className="space-y-4">
      {Object.entries(userInfo).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 capitalize">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <input
            type="text"
            value={value}
            onChange={(e) => setUserInfo({...userInfo, [key]: e.target.value})}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      ))}
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
        Save Changes
      </button>
    </form>
  );

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>

      <div className="main_screen">
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">User Profile</h2>
          <ul className="space-y-4">
            {['User Info', 'Previous Orders', 'Reviews', 'Settings'].map((item) => (
              <li
                key={item}
                className={`flex items-center cursor-pointer ${activeTab === item.toLowerCase().replace(' ', '') ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
                onClick={() => setActiveTab(item.toLowerCase().replace(' ', ''))}
              >
                <span className="mr-2">{item === 'User Info' ? '👤' : item === 'Previous Orders' ? '🛍' : item === 'Reviews' ? '⭐' : '⚙'}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto p-6">
          <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300">
            Log out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="flex items-center mb-10">
          <div className="relative">
            <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full mr-4 object-cover" />
            <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <input id="profile-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{userInfo.name} {userInfo.fullName}</h1>
            <p className="text-gray-600">{userInfo.location}</p>
          </div>
        </div>

        {activeTab === 'userinfo' && renderUserInfo()}
        {activeTab === 'previousorders' && renderPreviousOrders()}
        {activeTab === 'reviews' && renderReviews()}
        {activeTab === 'settings' && renderSettings()}
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserProfile;