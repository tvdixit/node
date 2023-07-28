const express = require('express');
const router = express.Router();
const validate = require('../midlware/validate');
const { reviewvalidation, idSchema } = require("../validation/review_validation")
const { AddReview, ReviewData } = require("../controller/reviewController");

router
    .post(
        "/add",
        validate(reviewvalidation),
        AddReview
    )
    .get(
        "/get",
        validate(idSchema),
        ReviewData
    );

module.exports = {
    route: router
};