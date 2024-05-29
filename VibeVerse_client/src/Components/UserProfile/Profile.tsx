import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const url = "http://localhost:3000/api/v1/users/current_user";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(url,{ withCredentials: true } );
        console.log("Response:", response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUser();
  }, []);

  if (!userDetails) {
    return <div className='text-white'>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full bg-gray-200 h-48 relative">
      <img
            className="w-full h-full border-4 border-white"
            src={userDetails.data.avatar || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        <div className="absolute bottom-0 left-4 transform translate-y-1/2">
          <img
            className="w-32 h-32 rounded-full border-4 border-white"
            src={userDetails.data.coverImage || "https://via.placeholder.com/150"}
            alt="Profile"
          />
        </div>
      </div>
      <div className="mt-16 px-4">
        <h1 className="text-3xl font-semibold text-gray-900">{userDetails.data.username}</h1>
        <p className="text-gray-600"> {userDetails.data.fullName}</p>
        <div className="mt-4 flex space-x-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-md">
            Subscribe
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md">
            Message
          </button>
        </div>
      </div>
      <div className="mt-8 border-b border-gray-300">
        <nav className="flex space-x-4 px-4">
          <a href="#" className="text-gray-700 py-2 border-b-2 border-red-600">
            Home
          </a>
          <a href="#" className="text-gray-700 py-2">
            Videos
          </a>
          <a href="#" className="text-gray-700 py-2">
            Playlists
          </a>
          <a href="#" className="text-gray-700 py-2">
            Channels
          </a>
          <a href="#" className="text-gray-700 py-2">
            About
          </a>
        </nav>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Uploads</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {userDetails.recentUploads.map((video, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <img
                className="w-full h-32 object-cover rounded-md"
                src={video.thumbnail || "https://via.placeholder.com/320x180"}
                alt="Video Thumbnail"
              />
              <h3 className="mt-2 text-lg font-semibold text-gray-900">
                {video.title}
              </h3>
              <p className="text-gray-600">{video.views} views • {video.uploadedAt}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Profile;