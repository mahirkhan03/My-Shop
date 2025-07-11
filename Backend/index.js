require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRouter = require("./router/categoryRouter");
const colorRouter = require("./router/colorRouter");
const productRouter = require("./router/productRouter");
const adminRouter = require('./router/adminRouter');
const userRouter = require('./router/userRouter');
const cartRouter = require('./router/cartRouter');
const orderRouter = require('./router/orderRouter');

const server = express();
server.use(cors());
server.use(express.json());
server.use("/category", categoryRouter)
server.use('/color', colorRouter)
server.use('/product', productRouter)
server.use('/admin', adminRouter)
server.use('/user', userRouter)
server.use('/cart', cartRouter)
server.use('/order', orderRouter)
server.use(express.static("./public"))



mongoose.connect(process.env.MONGODB, { dbName: "WSJP" }).then(
    () => {
        server.listen(5000, () => {
            console.log("Server is running on port 5000");

        })
        console.log("Connected to MongoDB");
    }

).catch((err) => {
    console.log("Error connecting to MongoDB ");

})