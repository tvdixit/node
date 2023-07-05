
const express = require('express');
const router = express.Router();

const { createDetail, UserpersonalData } = require("../controller/personaldtlController");

router.post(
    "/addPersonaldetail",
    createDetail
)
router.get(
    "/personalData/:id",
    UserpersonalData,
)
module.exports = {
    route: router
};