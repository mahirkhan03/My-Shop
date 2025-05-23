import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";

const Header = () => {
    return (
        <header className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between">
            {/* Left: Menu / Title */}
            <div className="flex items-center space-x-4">
                <button className="lg:hidden text-2xl text-gray-600">
                    <MdMenu />
                </button>
                <h2 className="text-xl font-semibold  text-gray-800">Admin Panel</h2>
            </div>

            {/* Right: Search, Notifications, Profile */}
            <div className="flex items-center space-x-4">
                {/* Search bar */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-sm" />
                </div>

                {/* Notifications */}
                <button className="relative text-gray-600 text-lg">
                    <FaBell />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                {/* Profile */}
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition">
                    <FaUserCircle className="text-2xl" />
                    <span className="hidden md:inline text-sm font-medium">Admin</span>
                </button>
            </div>
        </header>
    );
}

export default Header;