const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const validate = require('../midlware/validate');
const { CreateUserValidation, UpdateUserValidation, loginUserValidation, useridvalidation } = require("../validation/user_validation")
const { auth, Userlogin, authUser } = require("../midlware/auth")
const { createUser, UserData, UpdateUser, UserSpecificData, UserFilterData, deleteUserData, UserMatch, UserLookup } = require("../controller/userController");

const profileUpload = multer({
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
}).array('profile_photo', 5);

// const upload = multer({ storage: multer.memoryStorage() });
// const profileUpload = upload.fields([{ name: "profile_photo" }]);

router
    .post("/addDetail",
        profileUpload,
        validate(CreateUserValidation),
        createUser
    )
    .post("/login/user",
        validate(loginUserValidation),
        Userlogin
    )
    .get("/userdata",
        auth(),
        validate(useridvalidation),
        UserData
    )
    .get("/userspecificData",
        auth(),
        validate(useridvalidation),
        UserSpecificData
    )
    .get("/userFilter",
        UserFilterData
    )
    .patch("/updateUser",
        authUser(),
        validate(UpdateUserValidation),
        UpdateUser
    )
    .delete("/deleteUser",
        auth(),
        validate(useridvalidation),
        deleteUserData
    )
    .get("/aggregate/matchuser",
        UserMatch
    )
    .get("/lookup",
        UserLookup
    )
module.exports = {
    route: router
};