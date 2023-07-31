const express = require('express');
const router = express.Router();
const validate = require('../midlware/validate');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { createOrderValidation, idvalidation, updateOrdervalidation } = require("../validation/order_validation")
const { order, OrderData, Updateorderdata, deleteorderData } = require("../controller/orderController");


// product_image upload :
const productimage = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload/image');
        },
        filename: (req, file, cb) => {
            const fileExtName = file.originalname.substring(file.originalname.lastIndexOf('.'));
            const fileName = `${uuidv4()}${fileExtName}`;
            console.log(fileName);
            cb(null, fileName);
        }
    })
}).array('product[0][product_image]', 5);

router
    .post("/create", productimage, validate(createOrderValidation), order)
    .get("/getdata", validate(idvalidation), OrderData)
    .patch("/update/data", validate(idvalidation), validate(updateOrdervalidation), Updateorderdata)
    .delete("/delete", validate(idvalidation), deleteorderData)
module.exports = {
    route: router
};