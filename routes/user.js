const express = require('express');
const router = express.Router();

const { createUser, UserData, verifyToken, UpdateUser, UserSpecificData, UserFilterData, deleteUserData, UserMatch, UserLookup } = require("../controller/userController")

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
    "/aggregate",
    UserLookup
)
module.exports = {
    route: router
};