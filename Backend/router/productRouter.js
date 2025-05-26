const express = require("express");
const productRouter = express.Router();
const fileuploader = require("express-fileupload")
const productController = require("../controller/productController");
const adminAuth = require("../middleware/adminAuth");

productRouter.post('/create', [adminAuth, fileuploader({ createParentPath: true })], productController.create)
productRouter.get('/:id?', productController.getdata);
productRouter.patch('/status/:id', adminAuth, productController.status);
productRouter.put('/update/:id',fileuploader({ createParentPath: true }), productController.update);
productRouter.delete('/delete/:id', adminAuth, productController.delete);
productRouter.patch('/multiple-image/:id', fileuploader({ createParentPath: true }), productController.multiple);



module.exports = productRouter;