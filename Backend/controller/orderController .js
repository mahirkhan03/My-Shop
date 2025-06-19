const CartModel = require('../model/cartModel');
const OrderModel = require('../model/orderModel')
const UserModel = require('../model/userModel')
const Razorpay = require('razorpay');
const crypto = require("crypto")
var instance = new Razorpay(
    {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    }
)
const orderController = {
    // async placeOrder(req, res) {
    //     try {
    //         const { user_id, order_total, payment_mode, shipping_details } = req.body;
    //         const cart = await CartModel.find({ user_id: user_id }).populate(
    //             'product_id',
    //             '_id finalPrice'
    //         );
    //         const product_details = cart.map((cd) => {
    //             return {
    //                 product_id: cd.product_id._id,
    //                 qty: cd.qty,
    //                 price: cd.product_id.finalPrice,
    //                 total: (cd.qty * cd.product_id.finalPrice)
    //             }
    //         })

    //         const order = await new OrderModel(
    //             {
    //                 user_id: user_id,
    //                 order_total: order_total,
    //                 payment_mode: payment_mode,
    //                 shipping_details: shipping_details,
    //                 product_details: product_details,
    //                 order_status: 0
    //             }
    //         ).save()

    //         if (payment_mode == 0) {
    //             await CartModel.deleteMany({ user_id })
    //             return res.send({ msg: "Order place successfully", flag: 1, order_id: order._id })
    //         } else {
    //             var options = {
    //                 amount: order_total * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //                 currency: "INR",
    //                 receipt: order._id
    //             };
    //             instance.orders.create(options, async function (err, Razorpayorder) {
    //                 if (err) {
    //                     console.log(err)
    //                     return res.send({ msg: "Initial payment fail", flag: 0 })
    //                 } else {
    //                     order.razorpay_order_id = Razorpayorder.id;
    //                     await order.save();
    //                     return res.send({
    //                         msg: "Order placed", flag: 1, order_id: order._id,
    //                         razorpay_order_id: Razorpayorder.id
    //                     })
    //                 }
    //             });
    //         }


    //     } catch (err) {
    //         console.log(err)
    //         res.send({ msg: "Internal Server Error", flag: 0 })
    //     }

    // },
async placeOrder(req, res) {
    try {
        const { user_id, order_total, payment_mode, shipping_details } = req.body;

        const cart = await CartModel.find({ user_id }).populate('product_id', '_id finalPrice');

        const product_details = cart.map((cd) => ({
            product_id: cd.product_id._id,
            qty: cd.qty,
            price: cd.product_id.finalPrice,
            total: cd.qty * cd.product_id.finalPrice
        }));

        const order = await new OrderModel({
            user_id,
            order_total,
            payment_mode,
            shipping_details,
            product_details,
            order_status: 0
        }).save();

        if (payment_mode === 0) {
            await CartModel.deleteMany({ user_id });
            return res.send({ msg: "Order placed successfully", flag: 1, order_id: order._id });
        }

        // Online Payment
        const options = {
            amount: order_total * 100, // in paise
            currency: "INR",
            receipt: String(order._id),
        };

        instance.orders.create(options, async (err, razorpayOrder) => {
            if (err) {
                console.error("Razorpay Error:", err);
                return res.send({ msg: "Initial payment failed", flag: 0 });
            }

            order.razorpay_order_id = razorpayOrder.id;
            await order.save();

            return res.send({
                msg: "Order placed",
                flag: 1,
                order_id: order._id,
                razorpay_order_id: razorpayOrder.id,
            });
        });

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).send({ msg: "Internal Server Error", flag: 0 });
    }
}
    //   async orderSuccess(req, res) {
    //     try {
    //         const { order_id, user_id, razorpay_response } = req.body;
    //         const order = await OrderModel.findById(order_id);
    //         if (!order) {
    //             return res.send({ msg: "Order not found", flag: 0 });
    //         }
    //         const user = await UserModel.findById(user_id);
    //         if (!user) {
    //             return res.send({ msg: "User not found", flag: 0 });
    //         }
    //         // Check if the order is already paid
    //         if (order.payment_status == 1) {
    //             return res.send({ msg: "Order already paid", flag: 0 });
    //         }
    //         // Verify the payment

    //         const generated_signature =
    //             crypto
    //                 .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    //                 .update(razorpay_response.razorpay_order_id + "|" + razorpay_response.razorpay_payment_id)
    //                 .digest("hex");
    //         console.log(generated_signature);
    //         console.log(razorpay_response.razorpay_signature);
    //         if (generated_signature !== razorpay_response.razorpay_signature) {
    //             return res.send({ message: "Payment verification failed", flag: 0 });
    //         }
    //         // Update order status to paid
    //         order.payment_status = 1;
    //         order.order_status = 1;
    //         order.razorpay_payment_id = razorpay_response.razorpay_payment_id;
    //         await order.save();
    //         await CartModel.deleteMany({ user_id });
    //         res.send({ message: "Order placed succesfully", flag: 1, order_id: order._id });
    //     } catch (error) {
    //         console.error("Error in order success:", error.message);
    //         res.send({ message: "Internal server error", flag: 0 });
    //     }
    // }

}

module.exports = orderController;