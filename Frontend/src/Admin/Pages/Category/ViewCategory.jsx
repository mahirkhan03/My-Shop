import { useContext, useEffect, } from "react";
import { FaPlus } from "react-icons/fa";
import { FiEdit, FiPlus } from "react-icons/fi"
import { Link } from "react-router-dom";
import { MainContext } from "../../../Context";
import axios from "axios";
import { useSelector } from "react-redux";


function ViewCategory() {
  const admin = useSelector((state) => state.admin)
  const { API_BASH_URL, CATEGORY_URL, notify } = useContext(MainContext);
  const { getCategory, Categories } = useContext(MainContext);

  function statusHandler(id) {
    axios.patch(API_BASH_URL + CATEGORY_URL + `/status/${id}`,
    {},  {
        headers: {
          Authorization: admin?.token
        }
      }
    ).then(
      (resp) => {
        notify(resp.data.msg, resp.data.flag)
        if (resp.data.flag === 1) {
          getCategory();
        }
      }
    ).catch(
      (error) => {
        console.log(error)
        notify("something is wrong", 0)
      }
    )
  }
  function deleteHandler(id) {

    axios.delete(API_BASH_URL + CATEGORY_URL + `/delete/${id}`,
      {
        headers: {
          Authorization: admin?.token
        }
      }
    ).then(
      (resp) => {
        notify(resp.data.msg, resp.data.flag)
        if (resp.data.flag === 1) {
          getCategory();
        }
      }
    ).catch(
      (error) => {
        console.log(error)
        notify("something is wrong", 0)
      }
    )
  }

  useEffect(
    () => {
      getCategory()
    }, []
  ) 
   
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Title & Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Category / View</h1>
        <Link to={"/admin/category/add"} >
          <button className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
            <FaPlus />
            Add Category
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
        <table className="min-w-full bg-white text-left items-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 font-semibold text-gray-700">ID</th>
              <th className="py-3 px-4 font-semibold text-gray-700">NAME</th>
              <th className="py-3 px-4 font-semibold text-gray-700">SLUG</th>
              <th className="py-3 px-4 font-semibold text-gray-700">IMAGE</th>
              <th className="py-3 px-4 font-semibold text-gray-700">STATUS</th>
              <th className="py-3 px-4 font-semibold text-gray-700">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 items-center">
            {Array.isArray(Categories) &&
              Categories.map((cat, index) => (
                <tr key={index} className="shadow hover:bg-gray-50">
                  <td className="p-4">{index + 1}</td>
                  <td className="p-4">{cat.name}</td>
                  <td className="p-4">{cat.slug}</td>
                  <td className="p-4 px-8">
                    <img width="30px" src={`${API_BASH_URL}images/category/${cat.image}`} />
                  </td>
                  <td>

                    <button onClick={() => statusHandler(cat._id)} className={`px-4 p-2 text-white rounded-2xl ${cat.status ? `bg-green-400` : `bg-red-500`} m-2`} >
                      {
                        cat.status == true ?
                          "Active" : "Inactive"
                      }
                    </button>
                  </td>
                  <td className="p-4 flex   gap-4">
                    <Link className="text-yellow-500 hover:text-yellow-600 transition" to={`/admin/category/edit/${cat._id}`}>
                      <FiEdit className="text-lg" />
                    </Link>
                    <button onClick={() => deleteHandler(cat._id)} className="text-yellow-500   hover:text-yellow-600 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


export default ViewCategory;