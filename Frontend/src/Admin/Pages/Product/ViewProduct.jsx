import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { VscDiffMultiple } from "react-icons/vsc";
import {
    FaEdit,
    FaTrash,
    FaToggleOn,
    FaToggleOff,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa";
import { MainContext } from "../../../Context";
import axios from "axios";
import { useSelector } from "react-redux";

const viewProduct = () => {
    const admin = useSelector((state) => state.admin)
    const { product, getProduct, API_BASH_URL, PRODUCT_URL, notify } = useContext(MainContext);

    function statusHandler(id, flag) {
        axios.patch(API_BASH_URL + PRODUCT_URL + `/status/${id}`, { flag },
            {
                headers: {
                    Authorization: admin?.token
                }
            }
        ).then(
            (response) => {
                notify(response.data.msg, response.data.flag,)
                if (response.data.flag === 1) {
                    getProduct()
                }
            }
        ).catch(
            (error) => {
                console.log(error);

            }
        )

    }

    function deleteHandler(id) {

        axios.delete(API_BASH_URL + PRODUCT_URL + `/delete/${id}`,
            {
                headers: {
                    Authorization: admin?.token
                }
            }
        ).then(
            (resp) => {
                notify(resp.data.msg, resp.data.flag)
                if (resp.data.flag === 1) {
                    getProduct()
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
            getProduct()
        }, []
    )

    return (
        <section className="bg-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-x-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Product List</h2>
                        <Link to='/admin/product/add'>
                            <button
                                onClick={() => console.log("Navigate to add product")}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow"
                            >
                                <span>Add Product</span>
                            </button>
                        </Link>
                    </div>
                    <table className="min-w-full table-auto text-sm text-left text-gray-700">
                        <thead className="bg-gray-200 text-gray-600 uppercase text-xs">
                            <tr>
                                <th className="px-5 py-3">Name</th>
                                <th className="px-5 py-3">Slug</th>
                                <th className="px-4 py-3">Thumbnail</th>
                                <th className="px-5 py-3">Original</th>
                                <th className="px-5 py-3">Discount %</th>
                                <th className="px-5 py-3">Final</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-6 py-3">Stock</th>
                                <th className="px-8 py-3">Top</th>
                                <th className="px-12 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(product) && product.map((product, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">{product.name}</td>
                                    <td className="px-4 py-3">{product.slug}</td>
                                    <td className="px-6 py-3">
                                        <img
                                            src={`${API_BASH_URL}images/product/${product.thumbnail}`}
                                            // alt={product.name}
                                            className="w-12 h-12 "
                                        />
                                    </td>
                                    <td className="px-4 py-3">${product.originalPrice}</td>
                                    <td className="px-10 py-3 text-red-600">{product.discoutPercentage}%</td>
                                    <td className="px-4 py-3 text-green-600">${product.finalPrice}</td>
                                    <td className="px-4 py-3 text-center cursor-pointer" >
                                        {product.status ? (
                                            <span onClick={() => statusHandler(product._id, 1)} className="text-green-600 font-medium">Active</span>
                                        ) : (
                                            <span onClick={() => statusHandler(product._id, 1)} className="text-gray-400 font-medium">Inactive</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-3 text-center">
                                        {product.stock ? (
                                            <FaToggleOn onClick={() => statusHandler(product._id, 2)} className="text-green-500 text-xl" />
                                        ) : (
                                            <FaToggleOff onClick={() => statusHandler(product._id, 2)} className="text-gray-400 text-xl" />
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {product.topSelling ? (
                                            <span onClick={() => statusHandler(product._id, 3)} className="text-green-600 font-medium">Yes</span>
                                        ) : (
                                            <span onClick={() => statusHandler(product._id, 3)} className="text-gray-500 font-medium">No</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-3 flex gap-2">
                                        <Link to={`/admin/product/edit/${product._id}`}>
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-red-600 hover:text-red-800"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            title="View"
                                        >
                                            <FaEye />
                                        </button>
                                        <Link to={`/admin/product/multiple/${product._id}`}>
                                            <button
                                                className="text-red-600 hover:text-red-800"
                                                title="View"
                                            >
                                                <VscDiffMultiple />
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}

                            {product.length === 0 && (
                                <tr>
                                    <td colSpan="10" className="px-4 py-6 text-center text-gray-400">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default viewProduct;
