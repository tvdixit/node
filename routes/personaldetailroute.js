const express = require('express');
const router = express.Router();
const validate = require('../midlware/validate');
const { personalDetail_validation, useridvalidation, updatePersonalvalidation } = require("../validation/personaldetail_validation")
const { auth } = require("../midlware/auth")
const { createDetail, UserpersonalData, UpdatePersonaldata, deletepersonalData, PersonalLookup } = require("../controller/personaldtlController");

router
    .post("/addPersonaldetail", validate(personalDetail_validation), createDetail)
    .get("/personalData", auth(), validate(useridvalidation), UserpersonalData)
    .patch("/update", auth(), validate(updatePersonalvalidation), UpdatePersonaldata)
    .delete("/deletepersonal", auth(), validate(useridvalidation), deletepersonalData)
    .get("/lookup", PersonalLookup)
module.exports = {
    route: router
};