import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainContext } from "../../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { emtyCard } from "../../redux/slice/cartSlices";
import { formatToIndianCurrency } from "../../helper";

const Checkout = () => {
    const { API_BASH_URL, notify } = useContext(MainContext);
    const user = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedAddress, setSelectedAddress] = useState(0);
    const [paymentMode, setPaymentMode] = useState(0);

    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };


    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post(`${API_BASH_URL}order/place-order`, {
                user_id: user.data?._id,
                order_total: cart.final_total,
                payment_mode: paymentMode,
                shipping_details: user?.data?.shipping_address[selectedAddress],
            });

            const data = response.data;
            notify(data.msg, data.flag);

            if (data.flag !== 1) return;

            if (paymentMode === 0) {
                dispatch(emtyCard());
                navigate(`/thank-you/${data.order_id}`);
                return;
            }

            const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                notify("Failed to load Razorpay SDK. Please try again.", 0);
                return;
            }

            const options = {
                key: "rzp_test_EqDIiJ15v780zg", // Replace in prod
                currency: "INR",
                amount: cart.final_total * 100,
                name: "ISHOP",
                order_id: data.razorpay_order_id,
                prefill: {
                    name: user?.data?.name,
                    email: user?.data?.email,
                    contact: user?.data?.shipping_address[selectedAddress]?.contact,
                },
                handler: async (razorpay_response) => {
                    try {
                        const confirmRes = await axios.post(`${API_BASH_URL}order/success`, {
                            order_id: data.order_id,
                            user_id: user.data._id,
                            razorpay_response,
                        });

                        if (confirmRes.data.flag === 1) {
                            dispatch(emtyCard());
                            navigate(`/thank-you/${data.order_id}`);
                        } else {
                            notify("Payment succeeded but order confirmation failed.", 0);
                        }
                    } catch (err) {
                        notify("Payment handler error", 0);
                        console.error(err);
                    }
                },
                theme: {
                    color: "#F37254",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error("Place order error:", err);
            notify("Failed to place order.", 0);
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h1>

                    {/* Address */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Address</h2>
                        {user?.data?.shipping_address?.map((address, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedAddress(index)}
                                className={`p-4 border rounded-lg mb-4 cursor-pointer ${selectedAddress === index ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
                            >
                                <p className="font-medium">{address.name}</p>
                                <p>{address.contact}</p>
                                <p>{address.addressLine1}</p>
                                {address.addressLine2 && <p>{address.addressLine2}</p>}
                                <p>{address.city}, {address.state}, {address.postalCode}</p>
                                <p>{address.country}</p>
                            </div>
                        ))}
                        <div className="w-[100px] text-center p-2 bg-blue-500 text-white border rounded-md cursor-pointer">+</div>
                    </div>

                    {/* Payment Mode */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Mode</h2>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setPaymentMode(0)}
                                className={`flex-1 py-3 text-center rounded-lg font-medium border ${paymentMode === 0 ? "bg-blue-500 text-white border-blue-500" : "bg-gray-50 text-gray-700 border-gray-300"}`}
                            >
                                Cash on Delivery (COD)
                            </button>
                            <button
                                onClick={() => setPaymentMode(1)}
                                className={`flex-1 py-3 text-center rounded-lg font-medium border ${paymentMode === 1 ? "bg-blue-500 text-white border-blue-500" : "bg-gray-50 text-gray-700 border-gray-300"}`}
                            >
                                Online Payment
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section: Order Summary */}
                <div className="w-full h-[400px] lg:w-1/3 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Summary</h2>
                    <div className="p-4 bg-gray-50 border rounded-lg">
                        <div className="flex justify-between mb-2">
                            <p>Total Amount:</p>
                            <p className="font-medium">{formatToIndianCurrency(cart.original_total)}</p>
                        </div>
                        <div className="flex justify-between mb-2">
                            <p>Discount:</p>
                            <p className="text-green-600">{formatToIndianCurrency(cart.original_total - cart.final_total)}</p>
                        </div>
                        <div className="flex justify-between mb-4">
                            <p>Final Amount:</p>
                            <p className="font-semibold text-lg">{formatToIndianCurrency(cart.final_total)}</p>
                        </div>
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
