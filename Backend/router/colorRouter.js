const express = require("express");
const colorRouter = express.Router();

const colorController = require("../controller/colorController");
const adminAuth = require("../middleware/adminAuth");

colorRouter.post('/create',adminAuth, colorController.create)
colorRouter.get('/:id?', colorController.getdata)
colorRouter.patch('/status/:id',adminAuth, colorController.status);
colorRouter.delete('/delete/:id',adminAuth, colorController.delete);
colorRouter.put('/update/:id',adminAuth, colorController.update);



module.exports = colorRouter;