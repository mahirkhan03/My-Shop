const express = require("express");
const productRouter = express.Router();
const fileuploader = require("express-fileupload")
const productController = require("../controller/productController")

productRouter.post('/create', fileuploader({ createParentPath: true }), productController.create)
productRouter.get('/:id?', productController.getdata);
productRouter.patch('/status/:id', productController.status);
productRouter.put('/update/:id', fileuploader({ createParentPath: true }), productController.update);
productRouter.delete('/delete/:id', productController.delete);
productRouter.patch('/multiple-image/:id', fileuploader({ createParentPath: true }), productController.multiple);



module.exports = productRouter;