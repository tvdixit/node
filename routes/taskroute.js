const express = require('express');
const router = express.Router();
const validate = require('../midlware/validate');
const { status_validation, useridvalidation, statusMatchvalidation } = require("../validation/task_validation")
const { auth } = require("../midlware/auth")
const { Status, TaskData, UpdateTaskData, statusMatch, taskLookup, tasknelookup, deletetaskData } = require("../controller/taskController");

router
    .post("/create/status", validate(status_validation), Status)
    .get("/taskdata", auth(), validate(useridvalidation), TaskData)
    .patch("/updatestatus", auth(), validate(useridvalidation), UpdateTaskData)
    .get("/check/status", validate(statusMatchvalidation), statusMatch)
    .get("/task/lookup", taskLookup)
    .get("/task/ne/lookup", tasknelookup)
    .delete("/deletetask", auth(), validate(useridvalidation), deletetaskData)
module.exports = {
    route: router
};

