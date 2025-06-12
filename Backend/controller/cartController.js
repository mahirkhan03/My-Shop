
const CartModel = require("../model/cartModel");

const cartController = {
    async movetoDb (req, res) {
        try {
           console.log(req.body);
           
        } catch (err) {
            res.send({ msg: "Internal server error", flag: 0 })
        }
    }
 
}
module.exports = cartController;