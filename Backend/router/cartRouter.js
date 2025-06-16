const express = require("express");
const cartRouter = express.Router();
const CartController = require("../controller/cartController");

cartRouter.post("/move-to-db", CartController.movetoDb);
cartRouter.post("/add-to-cart", CartController.addtoDb);


module.exports = cartRouter;