const express = require("express");
const orderRouter = express.Router();
const OrderController = require("../controller/orderController ");

orderRouter.post("/place-order", OrderController.placeOrder);



module.exports = orderRouter;