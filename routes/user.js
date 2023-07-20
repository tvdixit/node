const express = require('express');
const router = express.Router();
const { auth, Userlogin, authUser } = require("../midlware/auth")
const { createUser, UserData, decodeToken, UpdateUser, UserSpecificData, UserFilterData, deleteUserData, UserMatch, UserLookup } = require("../controller/userController")

router
    .post("/addDetail", createUser)
    .post("/login/user", Userlogin)
    .get("/userdata", auth(), UserData)
    .post("/decodetoken", decodeToken, UserData,)
    .get("/userspecificData/:id", UserSpecificData)
    .get("/userFilter", UserFilterData)
    .patch("/updateUser", authUser(), UpdateUser)
    .delete("/deleteUser/:id", deleteUserData)
    .get("/aggregate/matchuser", UserMatch)
    .get("/lookup", UserLookup)
module.exports = {
    route: router
};