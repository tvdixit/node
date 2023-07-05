
const express = require('express');
const router = express.Router();

const { createDetail, UserpersonalData, verifyToken } = require("../controller/personaldtlController");

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
module.exports = {
    route: router
};