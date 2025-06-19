const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../controller/orderController ");

orderRouter.post("/place-order", OrderController.placeOrder);
// orderRouter.post("/success", OrderController.orderSuccess);



module.exports = orderRouter;