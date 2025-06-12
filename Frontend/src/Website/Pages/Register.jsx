import React, { useContext, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdEmail, MdPerson } from 'react-icons/md';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MainContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../redux/slice/userSlices';
import { useEffect } from 'react';

function RegisterPage() {
    const user = useSelector((state) => state.user)
    const [searchParams, setSearchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const { API_BASH_URL, USER_URL, notify } = useContext(MainContext)


    const Dispatcher = useDispatch();
    const navigator = useNavigate();

    function registerHandler(e) {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }

        axios.post(API_BASH_URL + USER_URL + "/register", data).then(
            (resp) => {
                notify(resp.data.msg, resp.data.flag)
                if (resp.data.flag === 1) {
                    e.target.reset()
                    Dispatcher(setUser(
                        {
                            user: resp.data.user,
                            user_token: resp.data.token
                        }
                    ))

                    navigator("/")

                }
            }
        ).catch(
            (error) => {
                console.log(error);
                notify("Something is wrong", 0)
            }
        )
    }

    useEffect(
        () => {
            if (user.data != null) {
                navigator("/")
            }
        },
        [user]
    )

    return (
        <>
            <div className="w-full bg-white mt-5 px-6 py-3 rounded-full shadow-sm mb-6">
                <nav className="text-sm text-gray-500 font-medium space-x-1">
                    <span className="text-gray-400">Home</span>
                    <span>/</span>
                    <span className="text-gray-400">pages</span>
                    <span>/</span>
                    <span className="text-black font-semibold">Register</span>
                </nav>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden">
                    {/* Left Illustration */}
                    <div className="w-full md:w-1/2 bg-white items-center justify-center">
                        {/* Illustration Placeholder */}
                        <div className="w-full h-full bg-white  flex items-center justify-center mb-6">
                            <img src="/public/login.svg.svg" alt="" />
                        </div>
                    </div>


                    {/* Right Form */}
                    <div className="w-full md:w-1/2 p-10">
                        <h2 className="text-2xl font-bold text-teal-600">Register</h2>
                        <p className="text-gray-500 mb-8 tracking-wide">JOIN TO US</p>

                        <form onSubmit={registerHandler} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Your Name</label>
                                <div className="relative mt-1">
                                    <MdPerson className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="text"
                                        name='name'
                                        placeholder="Jhon Deo"
                                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative mt-1">
                                    <MdEmail className="absolute top-3 left-3 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Example@gmail.com"
                                        className="pl-10 w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative mt-1">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name='password'
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
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <div className="relative mt-1">
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        className="w-full border border-gray-300 rounded-md py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute top-3 right-3 text-gray-500"
                                    >
                                        {showConfirm ? <FiEye /> : <FiEyeOff />}
                                    </button>
                                </div>
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600 transition"
                            >
                                REGISTER
                            </button>
                        </form>

                        {/* Login Redirect */}
                        <div className="mt-6 text-sm text-center text-gray-600">
                            ALREADY USER?{' '}
                            <Link to={"/login"} className="text-green-600 hover:underline">
                                LOGIN
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterPage;