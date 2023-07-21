const express = require('express');
const router = express.Router();
const { auth } = require("../midlware/auth")
const { createDetail, UserpersonalData, UpdatePersonaldata, deletepersonalData, PersonalLookup } = require("../controller/personaldtlController");

router
    .post("/addPersonaldetail", createDetail)
    .get("/personalData", auth(), UserpersonalData)
    .patch("/update", auth(), UpdatePersonaldata)
    .delete("/deletepersonal", auth(), deletepersonalData)
    .get("/lookup", PersonalLookup)
module.exports = {
    route: router
};