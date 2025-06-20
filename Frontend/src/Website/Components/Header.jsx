import React from "react";
import { useEffect } from "react";
import { FaPhoneAlt, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emtyCard, lstoCart } from "../../redux/slice/cartSlices";
import { lstoUser, userLogout } from "../../redux/slice/userSlices";

export default function Header() {
  const user = useSelector((state) => state.user.data)
  const dispatcher = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(
    () => {
      dispatcher(lstoCart())
      dispatcher(lstoUser())
    },
    []
  )

  function logOutHandler(){
dispatcher(userLogout());
dispatcher(emtyCard());
  }
  return (
    <header className="bg-white shadow-md">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-2 text-sm border-b">
        <div className="flex items-center gap-2 text-gray-600">
          <span className="bg-gray-200 text-xs px-2 py-1 rounded">Hotline 24/7</span>
          <span>(025) 3886 25 16</span>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <Link className="hover:text-black">Sell on Swoo</Link>
          <Link className="hover:text-black">Order Tracking</Link>
          <select className="text-sm bg-transparent outline-none">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <span><img src="./Button → eng.png.svg" alt="" /></span>
          <select className="text-sm bg-transparent outline-none">
            <option value="Eng">Eng</option>
            <option value="Esp">Esp</option>
          </select>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/profile">
            <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
              <MdKeyboardArrowDown size={24} />
            </div>
          </Link>
          <div className="text-teal-600 font-bold text-lg leading-5">
            <div>SWOO</div>
            <div>TECH MART</div>
          </div>
        </div>

        <nav className="flex gap-6 text-sm font-medium">
          <Link to={"/"} className="hover:text-teal-600">HOMES <MdKeyboardArrowDown className="inline" /></Link>
          <Link to={"/pages"} className="hover:text-teal-600">PAGES <MdKeyboardArrowDown className="inline" /></Link>
          <Link to={"/product"} className="hover:text-teal-600">PRODUCTS <MdKeyboardArrowDown className="inline" /></Link>
          <Link to={"/store"} className="hover:text-teal-600">STORE <MdKeyboardArrowDown className="inline" /></Link>
          <Link to={"/contact"} className="hover:text-teal-600">CONTACT</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="text-xs text-right">
            <div>WELCOME</div>
            {
              user == null ? (
                <div className="flex gap-2">
                  <Link to="/login?ref=header" className="text-black font-semibold hover:text-teal-600">LOGIN</Link>
                  <span>/</span>
                  <Link to="/register?ref=header" className="text-black font-semibold hover:text-teal-600">REGISTER</Link>
                </div>
              ) : (
                <button
                  onClick={logOutHandler}
                  className="text-black text-sm font-bold cursor-pointer hover:text-teal-600"
                >
                  LOGOUT
                </button>
              )
            }
          </div>

          <Link to={"/cart"}>
            <div className="flex items-center relative gap-2">
              <FaShoppingCart className="text-gray-500 text-3xl" />
              <span className="text-white bg-teal-700 px-1.5 flex text-center items-center rounded-full absolute -top-4 left-3.5" >{cart.items.length}</span>
              <span className="font-semibold">$1,689.00</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-teal-600 px-6 py-3 flex items-center gap-4 text-white text-sm">
        <div className="bg-white text-black flex items-center px-4 py-2 rounded-full w-full max-w-lg">
          <select className="bg-transparent outline-none text-sm pr-2">
            <option>All Categories</option>
          </select>
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-grow px-2 outline-none bg-transparent"
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </button>
        </div>

        <div className="flex gap-8 text-sm">
          <span>FREE SHIPPING OVER $199</span>
          <span>30 DAYS MONEY BACK</span>
          <span>100% SECURE PAYMENT</span>
        </div>
      </div>
    </header>
  );
}
