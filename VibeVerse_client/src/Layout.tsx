import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import SearchBar from "./Components/SearchBar.tsx";
import { useLocation } from "react-router-dom";
import HomePage from "./Components/HomePage.tsx";

function Layout() {
  
  const location = useLocation();
  const pathname = location.pathname;
  // console.log(pathname);
  return (
    <>
      <div className="flex flex-row justify-between w-full h-full">
        {(pathname !== "/register" && pathname !== "/login") && (
          <div className={`w-2/12  opacity-100`}>
            <Navbar />
          </div>
        )}

        <div className={` w-10/12 flex flex-col gap-2 items-center mx-auto`}>
          {(pathname !== "/register" && pathname !== "/login") && (
            <div className="text-black w-6/12 lg:ml-36">
              <SearchBar />
            </div>
          )}

          <div className="w-full h-full">
            {pathname === "/" ? <HomePage/>:<Outlet />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
