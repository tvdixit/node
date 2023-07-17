
const express = require('express');
const router = express.Router();
const { auth, verifyToken } = require("../midlware/auth")
const { createDetail, UserpersonalData, UpdatePersonaldata, decodetoken, deletepersonalData, PersonalLookup } = require("../controller/personaldtlController");

router.post(
    "/addPersonaldetail",
    createDetail
)
router.get(
    "/personalData/:id",
    UserpersonalData,
)
router.patch(
    "/update",
    UpdatePersonaldata
)
router.post(
    "/verifytoken",
    verifyToken,
)
router.post(
    "/decodetoken",
    decodetoken,
    UserpersonalData
)
router.delete(
    "/deletepersonal/:id",
    deletepersonalData
)
router.get(
    "/lookup",
    PersonalLookup
)
module.exports = {
    route: router
};