const OrderModel = require('../model/orderModel')



const orderController = {
    async placeOrder(req, res) {
        try {

        
        } catch (err) {
            res.send({ msg: "Internal Server Error", flag: 0 })
        }

    }
}


module.exports = orderController;