import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar.tsx";
import SearchBar from "./Components/SearchBar.tsx";
function Layout() {
  return (
    <>
      <div className="flex flex-row justify-between w-full h-full">
        <div className={`w-2/12 bg-black opacity-100 border-black border-2 border-opacity-100`}>
          <Navbar />
        </div>

        <div className={`bg-black w-10/12 flex flex-col gap-2 items-center mx-auto`}>
          <div className="text-white w-6/12 lg:ml-36">
            <SearchBar />
          </div>

          <div className="w-full h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
