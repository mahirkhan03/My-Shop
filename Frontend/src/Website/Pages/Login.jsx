import React, { useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { FaLock, FaStar, FaDollarSign } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

 function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <>
         <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
      <nav className="text-sm text-gray-500 font-medium space-x-1">
        <span className="text-gray-400">Home</span>
        <span>/</span>
        <span className="text-gray-400">pages</span>
        <span>/</span>
        <span className="text-black font-semibold">Login</span>
      </nav>
    </div>
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
        {/* Left: Illustration */}
        <div className="w-full md:w-1/2 bg-white  items-center justify-center">
          {/* Illustration Placeholder */}
          <div className="w-full h-full bg-white  flex items-center justify-center mb-6">
            <img src="/public/login.svg.svg" alt="" />
          </div>
        
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-teal-600">Welcome Back</h2>
          <p className="text-gray-500 mb-8 tracking-wide">LOGIN TO CONTINUE</p>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative mt-1">
                <MdEmail className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Example@gmail.com"
                  className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-3 text-gray-500"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </button>
              </div>
              <div className="text-right text-sm mt-1">
                <a href="#" className="text-gray-500 hover:text-teal-600">
                  Forget Password ?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
            >
              LOGIN
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600">
            NEW USER ?{' '}
            <a href="#" className="text-green-600 hover:underline">
              SIGN UP
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage ;