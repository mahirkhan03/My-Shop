import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaSave, FaToggleOn, FaToggleOff } from "react-icons/fa";
import axios from 'axios';
import { MainContext } from '../../../Context';
import { useSelector } from 'react-redux';

export default function MultipleImages() {
    const admin = useSelector((state) => state.admin)
    const { notify, API_BASH_URL, PRODUCT_URL } = useContext(MainContext);
    const { productId } = useParams();
    const SubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData()
        for (let image of e.target.images.files) {
            formData.append("images", image)
        }
        axios.patch(API_BASH_URL + PRODUCT_URL + "/multiple-image/" + productId, formData,
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
    // console.log(productId);

    return (
        <section className="bg-gray-100 py-10 px-4 w-full">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                    <FaArrowLeft /> Back
                </button>
            </div>

            <div className="w-full bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <FaPlus /> Add new Product images
                </h2>

                <form onSubmit={SubmitHandler} className="space-y-6 w-full">
                    <div className="col-span-2 grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900">
                                images
                            </label>
                            <input
                                type="file"
                                multiple
                                name="images"
                                id="images"
                                readOnly
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                                text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                            />
                        </div>
                    </div>
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                        >
                            <FaSave /> Save Product
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};


