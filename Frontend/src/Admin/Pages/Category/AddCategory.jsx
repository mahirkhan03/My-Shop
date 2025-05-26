import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { MainContext } from '../../../Context';
import { useSelector } from 'react-redux';


const AddCategory = () => {
  const admin = useSelector((state) => state.admin);
  const { API_BASH_URL, CATEGORY_URL, notify } = useContext(MainContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', description: '' });
  };
  const nameRef = useRef();
  const slugRef = useRef();

  function handNameChange() {
    const name = nameRef.current.value;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    slugRef.current.value = slug;
  }
  function submitHandle(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name", nameRef.current.value);
    formData.append("slug", slugRef.current.value);
    formData.append("Image", e.target.category_image.files[0]);

    axios.post(API_BASH_URL + CATEGORY_URL + "/create", formData,
      {
        headers:{
          Authorization:admin?.token
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
        <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
        <form onSubmit={submitHandle} className="space-y-4">
          {/* Category Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Category Name
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
              Category Slug
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
            <label htmlFor="description" className="block text-sm font-medium my-1 text-gray-700">
              Category Image
            </label>
            <input type="file"
              id='category-image'
              name='category_image'
              className='w-full bg-white border-gray-300 rounded-lg px-4 py-2 text-gray-600 outline' />

          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
