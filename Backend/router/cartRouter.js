const express = require("express");
const cartRouter = express.Router();
const CartController = require("../controller/cartController");

cartRouter.post("/move-to-db", CartController.movetoDb);


module.exports = cartRouter;