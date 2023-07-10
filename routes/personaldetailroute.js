
const express = require('express');
const router = express.Router();

const { createDetail, UserpersonalData, verifyToken, decodetoken, deletepersonalData } = require("../controller/personaldtlController");

router.post(
    "/addPersonaldetail",
    createDetail
)
router.get(
    "/personalData/:id",
    UserpersonalData,
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
module.exports = {
    route: router
};