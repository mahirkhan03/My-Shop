const express = require("express");
const categoryRouter = express.Router();
const fileuploader = require("express-fileupload")
const categoryController = require("../controller/categoryController")

categoryRouter.post('/create', fileuploader({ createParentPath: true }), categoryController.create)
categoryRouter.get('/:id?', categoryController.getdata)
categoryRouter.patch('/status/:id', categoryController.status);
categoryRouter.delete('/delete/:id', categoryController.delete);
categoryRouter.put('/update/:id',fileuploader({ createParentPath: true }), categoryController.update);



module.exports = categoryRouter;