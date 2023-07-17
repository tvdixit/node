const express = require('express');
const router = express.Router();
const { auth, verifyToken } = require("../midlware/auth")
const { createUser, UserData, decodeToken, UpdateUser, UserSpecificData, UserFilterData, deleteUserData, UserMatch, UserLookup } = require("../controller/userController")

router.post(
    "/addDetail",
    createUser,
)
router.get(
    "/userdata/:id",
    UserData,
)
router.post(
    "/verifytoken",
    verifyToken,
)
router.post(
    "/decodetoken",
    decodeToken,
    UserData,
)
router.get(
    "/userspecificData/:id",
    UserSpecificData
)
router.get(
    "/userFilter",
    UserFilterData
)
router.patch(
    "/updateUser",
    UpdateUser
)
router.delete(
    "/deleteUser/:id",
    deleteUserData
)
router.get(
    "/aggregate/matchuser",
    UserMatch
)
router.get(
    "/lookup",
    UserLookup
)
module.exports = {
    route: router
};