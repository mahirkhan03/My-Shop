const CartModel = require('../model/cartModel');
const OrderModel = require('../model/orderModel');
const UserModel = require('../model/userModel');
const Razorpay = require('razorpay');
const crypto = require("crypto");
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});
const orderController = {
    async placeOrder(req, res) {
        try {
            const { user_id, order_total, payment_mode, shipping_details } = req.body;

            // ✅ 1. Validate basic order fields
            if (!user_id || !order_total || !shipping_details) {
                return res.send({ msg: "Missing order details", flag: 0 });
            }

            if (!shipping_details.name) {
                console.warn("⚠️ Missing name in shipping_details. Using fallback.");
                shipping_details.name = "Unknown";
            }

            // Validate shipping fields
            const requiredFields = ['name', 'contact', 'addressLine1', 'city', 'state', 'postalCode', 'country'];
            const hasAllFields = requiredFields.every(field => shipping_details?.[field]);

            if (!hasAllFields) {
                console.log("❌ Invalid shipping data:", shipping_details);
                return res.send({ msg: "Invalid shipping address", flag: 0 });
            }

            // ✅ 3. Fetch cart for user
            const cart = await CartModel.find({ user_id }).populate('product_id', '_id finalPrice');
            if (!cart || cart.length === 0) {
                return res.send({ msg: "Your cart is empty", flag: 0 });
            }

            // ✅ 4. Build product details
            const product_details = cart.map(cd => ({
                product_id: cd.product_id._id,
                qty: cd.qty,
                price: cd.product_id.finalPrice,
                total: cd.qty * cd.product_id.finalPrice
            }));

            // ✅ 5. Flatten shipping object just in case
            const shipping = { ...shipping_details };

            // ✅ 6. Create order
            const order = await new OrderModel({
                user_id,
                order_total,
                payment_mode: payment_mode === 1 ? "online" : "cod",
                shipping_details: shipping,
                product_details,
                order_status: 0, // Order placed
                payment_status: payment_mode === 0 ? "paid" : "unpaid"
            }).save();

            // ✅ 7. COD - immediate success
            if (payment_mode === 0) {
                await CartModel.deleteMany({ user_id });
                return res.send({
                    msg: "Order placed successfully (COD)",
                    flag: 1,
                    order_id: order._id
                });
            }

            // ✅ 8. Online Payment - create Razorpay order
            const options = {
                amount: order_total * 100,
                currency: "INR",
                receipt: String(order._id)
            };

            instance.orders.create(options, async (err, razorpayOrder) => {
                if (err) {
                    console.error("❌ Razorpay error:", err);
                    return res.send({ msg: "Failed to initiate payment", flag: 0 });
                }

                order.razorpay_order_id = razorpayOrder.id;
                await order.save();

                return res.send({
                    msg: "Order placed, awaiting payment",
                    flag: 1,
                    order_id: order._id,
                    razorpay_order_id: razorpayOrder.id
                });
            });

        } catch (err) {
            console.error("❌ Error in placeOrder:", err.message);
            return res.send({ msg: "Internal Server Error", flag: 0 });
        }

    },

    // ✅ Order Success Handler for Razorpay
    async orderSuccess(req, res) {
        try {
            const { order_id, user_id, razorpay_response } = req.body;

            if (!order_id || !user_id || !razorpay_response) {
                return res.send({ message: "Missing confirmation data", flag: 0 });
            }

            const order = await OrderModel.findById(order_id);
            if (!order) return res.send({ message: "Order not found", flag: 0 });

            const user = await UserModel.findById(user_id);
            if (!user) return res.send({ message: "User not found", flag: 0 });

            if (order.payment_status === "paid") {
                return res.send({ message: "Order already paid", flag: 0 });
            }

            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = razorpay_response;

            // ✅ Signature verification
            const generated_signature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                .digest("hex");

            if (generated_signature !== razorpay_signature) {
                return res.send({ message: "Payment verification failed", flag: 0 });
            }

            // ✅ Update order
            order.payment_status = "paid";
            order.order_status = 1; // confirmed
            order.razorpay_payment_id = razorpay_payment_id;
            order.razorpay_signature = razorpay_signature;
            order.paid_at = new Date();

            await order.save();

            await CartModel.deleteMany({ user_id });

            return res.send({
                message: "Order confirmed and payment successful",
                flag: 1,
                order_id: order._id
            });

        } catch (error) {
            console.error("❌ Error in orderSuccess:", error.message);
            res.send({ message: "Internal Server Error", flag: 0 });
        }
    }
};

module.exports = orderController;
