// import React from "react";
// import { Link, NavLink} from 'react-router-dom';
// function Navbar() {
//   return (
//     <>
//       <div className="flex h-full flex-col text-white text-2xl">
//         <ul className="mt-10">
//           <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
//             <NavLink to="/" className={({isActive})=>
//             `${isActive ?'text-red-500' : 'text-white'}`
//             }>
//               Home
//             </NavLink>
//           </li>
//           <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
//             <NavLink to="/login" className={({isActive})=>
//             `${isActive ?'text-red-500' : 'text-white'}`
//             }>
//               Login
//             </NavLink>
//           </li>
//           <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
//             <NavLink to="/register" className={({isActive})=>
//             `${isActive ?'text-red-500' : 'text-white'}`
//             }>
//               Register
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Navbar;



import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    // setOpenFunc();
  };

  return (
    <>
      <button
        className="text-white text-3xl p-1 focus:outline-none absolute left-2 z-50"
        onClick={toggleNavbar}
      >
        <i className="fas fa-bars "></i>
      </button>
      <div className={`fixed top-0 left-0 w-2/12 h-full bg-gray-800 text-white transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full text-2xl p-2">
          <ul className="mt-10">
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink to="/" className={({ isActive }) =>
                `${isActive ? 'text-red-500' : 'text-white'}`
              }>
                Home
              </NavLink>
            </li>
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink to="/login" className={({ isActive }) =>
                `${isActive ? 'text-red-500' : 'text-white'}`
              }>
                Login
              </NavLink>
            </li>
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink to="/register" className={({ isActive }) =>
                `${isActive ? 'text-red-500' : 'text-white'}`
              }>
                Register
              </NavLink>
            </li>
            <li className="border-b-2 p-1 w-full h-12 border-gray-600 border-opacity-40 rounded-xl">
              <NavLink to="/profile" className={({ isActive }) =>
                `${isActive ? 'text-red-500' : 'text-white'}`
              }>
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
