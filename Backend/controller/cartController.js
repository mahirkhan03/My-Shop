
const e = require("cors");
const CartModel = require("../model/cartModel");

const cartController = {
    async movetoDb(req, res) {
        try {
            // console.log(req.body);
            const { cart, user_id } = req.body

            if (Array.isArray(cart) && cart.length > 0) {
                const allPromise = cart.map(async (item) => {

                    const { productId, qty } = item;

                    const existingCart = await CartModel.findOne({ user_id, product_id: productId });

                    if (existingCart) {
                        existingCart.qty += Number(qty);
                        await existingCart.save();
                    } else {
                        await CartModel.create({ user_id, product_id: productId, qty: Number(qty) })
                    }
                });

                await Promise.all(allPromise);
            }

            const updateCart = await CartModel.find({ user_id }).populate(
                'product_id',
                '_id finalPrice originalPrice'
            );
            res.send({ msg: "Cart processed successfully", flag: 1, cart: updateCart })
        } catch (error) {
            console.log(error)
            res.send({ msg: "Internal server error", flag: 0 })
        }
    }

}
module.exports = cartController;