const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { UserValidation } = require("../validation/user_valid")
const { auth, Userlogin, authUser } = require("../midlware/auth")
const { createUser, UserData, UpdateUser, UserSpecificData, UserFilterData, deleteUserData, UserMatch, UserLookup } = require("../controller/userController");
const { validate } = require('../midlware/validate');

const Upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'upload/image')
        },
        filename: (req, file, cb) => {
            const fileExtName = file.originalname.substring(file.originalname.lastIndexOf('.'));
            const fileName = `${uuidv4()}${fileExtName}`;
            console.log(fileName);
            cb(null, fileName);
        }
    })
}).array('profile_photo', 5)

router
    .post("/addDetail", validate(UserValidation.createUser), Upload, createUser)
    .post("/login/user", Userlogin)
    .get("/userdata", auth(), UserData)
    .get("/userspecificData", auth(), UserSpecificData)
    .get("/userFilter", UserFilterData)
    .patch("/updateUser", authUser(), UpdateUser)
    .delete("/deleteUser", auth(), deleteUserData)
    .get("/aggregate/matchuser", UserMatch)
    .get("/lookup", UserLookup)
module.exports = {
    route: router
};