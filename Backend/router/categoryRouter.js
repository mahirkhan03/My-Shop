const express = require("express");
const categoryRouter = express.Router();
const fileuploader = require("express-fileupload")
const categoryController = require("../controller/categoryController");
const adminAuth = require("../middleware/adminAuth");

categoryRouter.post('/create', [adminAuth, fileuploader({ createParentPath: true })], categoryController.create)
categoryRouter.get('/:id?', categoryController.getdata)
categoryRouter.patch('/status/:id', adminAuth, categoryController.status);
categoryRouter.delete('/delete/:id', adminAuth, categoryController.delete);
categoryRouter.put('/update/:id', adminAuth, fileuploader({ createParentPath: true }), categoryController.update);



module.exports = categoryRouter;