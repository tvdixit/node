const express = require('express');
const router = express.Router();
const { auth } = require("../midlware/auth")
const { Status, TaskData, UpdateTaskData, statusMatch, taskLookup, tasknelookup, decodetoken, deletetaskData } = require("../controller/taskController");

router
    .post("/create/status", Status)
    .get("/taskdata/:id", auth(), TaskData)
    .patch("/updatestatus", UpdateTaskData)
    .get("/check/status", statusMatch)
    .get("/task/lookup", taskLookup)
    .get("/task/ne/lookup", tasknelookup)
    // .post("/verifytoken", verifyToken)
    .post("/decodetoken", decodetoken, TaskData)
    .delete("/deletetask/:id", deletetaskData)
module.exports = {
    route: router
};

