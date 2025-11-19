import Button from "@/Components/Button";
import React, { useEffect } from 'react'; 
import { confirmLogout } from "@/Utils/Helper/SwalHelpers";

const dummyUser = {
  name: "Rizal Ahmad M",
  initials: "RA", 
  role: "Mahasiswa"
};

const Header = () => {
  useEffect(() => {
    const closeMenu = (event) => {
      const menu = document.getElementById("profileMenu");
      const button = document.getElementById("profileButton");
      
      if (menu && !menu.classList.contains("hidden") && !menu.contains(event.target) && button && !button.contains(event.target)) {
        menu.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };
  
  const pageTitle = ""; 

  const handleLogout = () => {
    confirmLogout(() => {
      localStorage.removeItem("user");
      location.href = "/";
    });
  };

  return (
    <header className="bg-white bg-opacity-70 backdrop-blur-sm border-b border-gray-100 shadow-lg sticky top-0 z-10 transition-all duration-300">
      <div className="flex justify-between items-center px-8 py-3">
        
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">
          {pageTitle}
        </h1>
        
        <div className="relative">
          <button
            id="profileButton"
            onClick={toggleProfileMenu}
            className="flex items-center space-x-3 p-1 rounded-full bg-transparent transition duration-200 focus:outline-none ring-2 ring-blue-700/50 hover:bg-indigo-50"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-800 text-white font-bold text-sm shadow-md">
              {dummyUser.initials}
            </div>
            <span className="hidden sm:block text-gray-800 font-bold mr-1">{dummyUser.name}</span>
            <svg className="w-4 h-4 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          <div
            id="profileMenu"
            className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl py-2 hidden ring-1 ring-gray-200 transform origin-top-right transition-all duration-200"
            style={{ zIndex: 50 }} 
          >
            <div className="px-4 py-3 border-b border-gray-100 bg-blue-50 rounded-t-xl">
                <p className="text-base font-extrabold text-blue-900">{dummyUser.name}</p>
                <p className="text-sm text-blue-600">{dummyUser.role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 transition duration-150 border-t border-gray-100 mt-1"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;