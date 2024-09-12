import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const userId = localStorage.getItem("userId");
  // console.log("navbar se : " + userId)
  const nevigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    // setOpenFunc();
  };

  const profileHandler = () => {
    nevigate(`/profile/${userId}`);
  };

  const url = `http://localhost:3000/api/v1/users/logout`;
  const logoutUser = async () => {
      try {
        const response = await axios.post(url, {},{ withCredentials: true });
        console.log("Response: Profile vala : ", response.data);
        if(response.status === 200) {
          navigate("/login");
        }
      } catch (error) {
        console.error(`Error fetching current user  : ${error.message}`);
        console.error("Error fetching user details:", error);
      }
  }
  return (
    <>
      <button
        className="text-white text-3xl p-1 focus:outline-none absolute left-2 z-50"
        onClick={toggleNavbar}
      >
        <i
          className={`fas fa-bars ${isOpen ? "text-white" : "text-black"}`}
        ></i>
      </button>
      <div
        className={`fixed top-0 left-0 w-2/12 h-full bg-black text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full text-2xl p-2 justify-between">
          <ul className="mt-10">
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `${isActive ? "text-red-500" : "text-white"}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? "text-red-500" : "text-white"}`
                }
              >
                Login
              </NavLink>
            </li>
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${isActive ? "text-red-500" : "text-white"}`
                }
              >
                Register
              </NavLink>
            </li>
            <button
              className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl "
              onClick={profileHandler}
            >
              <li className="text-start items-start">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `${isActive ? "text-red-500" : "text-white"}`
                  }
                >
                  Profile
                </NavLink>
              </li>
            </button>
          </ul>

          <div onClick={logoutUser} className=" cursor-pointer border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl text-red-500">Logout</div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
