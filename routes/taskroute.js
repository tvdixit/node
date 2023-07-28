const express = require('express');
const router = express.Router();
const validate = require('../midlware/validate');
const { status_validation } = require("../validation/task_validation")
const { auth } = require("../midlware/auth")
const { Status, TaskData, UpdateTaskData, statusMatch, taskLookup, tasknelookup, deletetaskData } = require("../controller/taskController");

router
    .post("/create/status", validate(status_validation), Status)
    .get("/taskdata", auth(), TaskData)
    .patch("/updatestatus", auth(), UpdateTaskData)
    .get("/check/status", statusMatch)
    .get("/task/lookup", taskLookup)
    .get("/task/ne/lookup", tasknelookup)
    .delete("/deletetask", auth(), deletetaskData)
module.exports = {
    route: router
};

