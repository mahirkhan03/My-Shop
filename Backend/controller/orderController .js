const CartModel = require('../model/cartModel');
const OrderModel = require('../model/orderModel')



const orderController = {
    async placeOrder(req, res) {
        try {
            const { user_id, order_total, payment_mode, shipping_details } = req.body;
            const cart = await CartModel.find({ user_id: user_id }).populate(
                'product_id',
                '_id finalPrice'
            );
            const product_details = cart.map((cd) => {
                return {
                    product_id: cd.product_id._id,
                    qty: cd.qty,
                    price: cd.product_id.finalPrice,
                    total: (cd.qty * cd.product_id.finalPrice)
                }
            })

            const order = await new OrderModel(
                {
                    user_id: user_id,
                    order_total: order_total,
                    payment_mode: payment_mode,
                    shipping_details: shipping_details,
                    product_details: product_details,
                    order_status: 0
                }
            ).save()
           
            
            return res.send({ msg: "Order place successfully", flag: 1, order_id: order._id })

        } catch (err) {
            console.log(err)
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    }
}


module.exports = orderController;