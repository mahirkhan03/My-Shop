const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const categoryRouter =require("./router/categoryRouter");
const colorRouter = require("./router/colorRouter");
const productRouter = require("./router/productRouter");
const adminRouter = require ('./router/adminRouter')
const server = express();
server.use(cors());
server.use(express.json());
server.use("/category",categoryRouter)
server.use('/color',colorRouter)
server.use('/product',productRouter)
server.use('/admin', adminRouter)
server.use(express.static("./public"))



mongoose.connect("mongodb://localhost:27017/", { dbName: "WSJP" }).then(
    () => {
        server.listen(5000, ()=>{
            console.log("Server is running on port 5000");
            
        })
        console.log("Connected to MongoDB");
    }

).catch((err) => {
  console.log("Error connecting to MongoDB ");
  
})