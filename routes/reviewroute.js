const express = require('express');
const router = express.Router();

const { AddReview, ReviewData } = require("../controller/reviewController");

router.post("/add", AddReview)
router.get("/review/:id", ReviewData)
module.exports = {
    route: router
};