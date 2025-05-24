import React from "react";
import { useContext } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { MainContext } from "../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/slice/adminSlices";

const Login = () => {

  const { API_BASH_URL, ADMIN_URL, notify } = useContext(MainContext)
  const navigator = useNavigate();
  const dispatcher = useDispatch()

  function submitHandle(e) {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    axios.post(API_BASH_URL + ADMIN_URL + "/login", data).then(
      (resp) => {
        notify(resp.data.msg, resp.data.flag)
        if (resp.data.flag === 1) {
          e.target.reset()
          navigator('/admin')
          dispatcher(setAdmin(
            {
              admin: resp.data.admin,
              token: resp.data.token
            }
          ))
        }
      }
    ).catch(
      (error) => {
        console.log(error)
        notify("something is wrong", 0)
      }
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form onSubmit={submitHandle} className="space-y-4">
          {/* Email Field */}
          <div className="flex items-center px-4 py-2 border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <MdEmail className="text-gray-500 text-xl mr-3" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center px-4 py-2 border rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
            <MdLock className="text-gray-500 text-xl mr-3" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
