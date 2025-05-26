import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { MainContext } from '../../../Context';
import { useSelector } from 'react-redux';

const AddColor = () => {
  const admin = useSelector((state) => state.admin);
  const { API_BASH_URL, COLOR_URL, notify } = useContext(MainContext)
  const navigate = useNavigate();

  const nameRef = useRef();
  const slugRef = useRef();

  function handNameChange() {
    const name = nameRef.current.value;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    slugRef.current.value = slug;
  }

  function submitHandle(e) {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      slug: slugRef.current.value,
      hexcode: e.target.hexcode.value
    }


    axios.post(API_BASH_URL + COLOR_URL + "/create", data,
      {
        headers: {
          Authorization: admin?.token
        }
      }
    ).then(
      (resp) => {
        notify(resp.data.msg, resp.data.flag)
        if (resp.data.flag === 1) {
          e.target.reset()
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      {/* Form */}
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Color / Create</h2>
        <form onSubmit={submitHandle} className="space-y-4">
          {/* Category Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              ref={nameRef}
              onChange={handNameChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Slug
            </label>
            <input
              type="text"
              name="name"
              id="name"
              ref={slugRef}
              required
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category slug"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="hexcode" className="block text-sm font-medium my-1 text-gray-700">
              Hex Code
            </label>
            <input type="color"
              id='hexcode'
              name='hexcode'
              className='w-full bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-600 outline' />

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Create Color
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
