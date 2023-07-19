
const express = require('express');
const router = express.Router();
const { auth } = require("../midlware/auth")
const { createDetail, UserpersonalData, UpdatePersonaldata, decodetoken, deletepersonalData, PersonalLookup } = require("../controller/personaldtlController");

router
    .post("/addPersonaldetail", createDetail)
    .get("/personalData/:id", auth(), UserpersonalData)
    .patch("/update", UpdatePersonaldata)
    // .post("/verifytoken", verifyToken)
    .post("/decodetoken", decodetoken, UserpersonalData)
    .delete("/deletepersonal/:id", deletepersonalData)
    .get("/lookup", PersonalLookup)
module.exports = {
    route: router
};