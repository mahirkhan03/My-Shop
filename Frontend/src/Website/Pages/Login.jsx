import React, { useContext, useState } from 'react';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';
import { MainContext } from '../../Context';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../../redux/slice/userSlices';
import { useEffect } from 'react';

function LoginPage() {
  const user = useSelector((state) => state.user.data)
  const [searchParams, setSearchParams] = useSearchParams();
  const { API_BASH_URL, USER_URL, notify } = useContext(MainContext)
  const [showPassword, setShowPassword] = useState(false);
  const cartData = JSON.parse(localStorage.getItem("cart"));
  const cart = cartData ? cartData.items : null

  const Dispatcher = useDispatch();
  const navigator = useNavigate();
  function submitHandler(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    axios.post(API_BASH_URL + USER_URL + "/login", data).then(
      async (resp) => {
        notify(resp.data.msg, resp.data.flag)
        if (resp.data.flag === 1) {
          e.target.reset()
          Dispatcher(setUser(
            {
              user: resp.data.user,
              user_token: resp.data.token
            }
          ))

          const updateCart = await axios.post(`${API_BASH_URL}cart/move-to-db`, {
            cart: cart != null ? cart : null,
            user_id: resp.data?.user?._id
          })
          let final_total = 0;
          let original_total = 0;

          const cartUpdate = updateCart.data.cart.map(
            (cd) => {
              const { product_id, qty, user_id } = cd;
              final_total += (product_id.finalPrice * qty)
              original_total += (product_id.originalPrice * qty)

              return {
                productId: product_id._id,
                qty: qty
              }

            }
          )

          localStorage.setItem("cart", JSON.stringify({
            items: cartUpdate, final_total, original_total
          }))

          if (searchParams.get("ref") === "checkout")
            navigator("/checkout")

        } else {
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
      if (user != null) {
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

            <form onSubmit={submitHandler} className="space-y-6">
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

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative mt-1">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
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
              <Link to='/register' className="text-green-600 hover:underline">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;