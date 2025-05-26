import React, { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { FaArrowLeft, FaPlus, FaSave, FaToggleOn, FaToggleOff } from "react-icons/fa";
import { MainContext } from "../../../Context";
import Select from 'react-select'
import axios from "axios";
import { useSelector } from "react-redux";

const AddProduct = ({ onSubmit }) => {
    const admin = useSelector((state) => state.admin)
    const { API_BASH_URL, notify, getCategory, Categories, getColors, colors, PRODUCT_URL, product, getProduct } = useContext(MainContext)
    const [selColors, setSelColors] = useState([])
    const [formData, setFormData] = useState({});

    const nameRef = useRef();
    const slugRef = useRef();
    const originalPriceRef = useRef();
    const discountRef = useRef();
    const finalPriceRef = useRef();

    function FinalPriceCal() {
        const op = originalPriceRef.current.value
        const dp = discountRef.current.value
        const fp = Math.floor(op - (op * (dp / 100)))
        finalPriceRef.current.value = fp
    }

    function handNameChange() {
        const name = nameRef.current.value;
        const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        slugRef.current.value = slug;
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("slug", slugRef.current.value);
        formData.append("originalPrice", originalPriceRef.current.value);
        formData.append("discoutPercentage", discountRef.current.value);
        formData.append("finalPrice", finalPriceRef.current.value);
        formData.append("thumbnail", e.target.thumbnail.files[0]);
        formData.append("shortDescription", e.target.shortDescription.value);
        formData.append("longDescription", e.target.longDescription.value);
        formData.append("categoryID", e.target.categoryID.value);
        formData.append("colors", JSON.stringify(selColors));

        axios.post(API_BASH_URL + PRODUCT_URL + "/create", formData,
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
    const handleCheckbox = (key) => {
        setFormData({ ...formData, [key]: !formData[key] });
    };

    useEffect(
        () => {
            getCategory()
            getColors()
        },
        []
    )

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
                    <FaPlus /> Add / Edit Product
                </h2>

                <form onSubmit={SubmitHandler} className="space-y-6 w-full">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                ref={nameRef}
                                onChange={handNameChange}
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                                text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                                placeholder="Product Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">
                                Slug</label>
                            <input
                                type="text"
                                name="slug"
                                id="slug"
                                ref={slugRef}
                                onChange={handNameChange}
                                readOnly
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                                placeholder="Product Name"
                            />
                        </div>
                    </div>

                    <div className="col-span-3 grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="originalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                                Original Price
                            </label>
                            <input
                                type="number"
                                name="originalPrice"
                                ref={originalPriceRef}
                                onChange={FinalPriceCal}
                                id="originalPrice"
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                                placeholder="100"
                            />
                        </div>
                        <div>
                            <label htmlFor="discoutPercentage" className="block mb-2 text-sm font-medium text-gray-900">
                                Discount Percentage
                            </label>
                            <input
                                type="number"
                                name="discoutPercentage"
                                ref={discountRef}
                                onChange={FinalPriceCal}
                                id="discoutPercentage"
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                                placeholder="1"
                            />
                        </div>
                        <div>
                            <label htmlFor="finalPrice" className="block mb-2 text-sm font-medium text-gray-900">
                                Final Price
                            </label>
                            <input
                                type="number"
                                name="finalPrice"
                                ref={finalPriceRef}
                                id="finalPrice"
                                readOnly
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                                placeholder="99"
                            />
                        </div>

                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="categoryID" className="block mb-2 text-sm font-medium text-gray-900">
                                Category ID
                            </label>
                            <Select name="categoryID" options={
                                Categories.map(
                                    (cat, index) => {
                                        return { value: cat._id, label: cat.name }
                                    }
                                )
                            } />

                        </div>
                        <div>
                            <label htmlFor="colors" className="block mb-2 text-sm font-medium text-gray-900">
                                Colors ID
                            </label>
                            <Select
                                onChange={
                                    (color) => {
                                        const col = color.map(o => o.value)
                                        setSelColors(col)
                                    }
                                }
                                isMulti closeMenuOnSelect={false} options={
                                    colors.map(
                                        (color, index) => {
                                            return { value: color._id, label: color.name }
                                        }
                                    )
                                } />
                        </div>

                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-5">
                        <div>
                            <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900">
                                Thumbnail
                            </label>
                            <input
                                type="file"
                                name="thumbnail"
                                id="thumbnail"
                                readOnly
                                className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium text-gray-900">
                            Short Description
                        </label>
                        <textarea
                            name="shortDescription"
                            id="shortDescription"
                            rows={3}
                            className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                        />
                    </div>
                    <div>
                        <label htmlFor="longDescription" className="block mb-2 text-sm font-medium text-gray-900">
                            Long Description
                        </label>
                        <textarea
                            id="longDescription"
                            name="longDescription"
                            rows={4}
                            className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm 
                            text-gray-900 shadow-sm focus: border-primary-600 ring-primary-600"
                        />
                    </div>

                    <div className="col-span-3 grid grid-cols-3 gap-4">
                        <Toggle label="In Stock" value={formData.stock} onClick={() => handleCheckbox("stock")} />
                        <Toggle label="Top Selling" value={formData.topSelling} onClick={() => handleCheckbox("topSelling")} />
                        <Toggle label="Status (Active)" value={formData.status} onClick={() => handleCheckbox("status")} />
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

const Toggle = ({ label, value, onClick }) => (
    <div className="flex items-center gap-2 shadow-sm px-3 py-2 rounded-md border border-gray-200 bg-white">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <button
            type="button"
            onClick={onClick}
            className="text-xl"
        >
            {value ? (
                <FaToggleOn className="text-green-500" />
            ) : (
                <FaToggleOff className="text-gray-400" />
            )}
        </button>
    </div>
);

export default AddProduct;