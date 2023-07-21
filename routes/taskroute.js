const express = require('express');
const router = express.Router();
const { auth } = require("../midlware/auth")
const { Status, TaskData, UpdateTaskData, statusMatch, taskLookup, tasknelookup, deletetaskData } = require("../controller/taskController");

router
    .post("/create/status", Status)
    .get("/taskdata", auth(), TaskData)
    .patch("/updatestatus", auth(), UpdateTaskData)
    .get("/check/status", statusMatch)
    .get("/task/lookup", taskLookup)
    .get("/task/ne/lookup", tasknelookup)
    .delete("/deletetask", auth(), deletetaskData)
module.exports = {
    route: router
};

