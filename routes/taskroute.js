const express = require('express');
const router = express.Router();
const { auth, verifyToken } = require("../midlware/auth")
const { Status, TaskData, UpdateTaskData, statusMatch, taskLookup, tasknelookup, decodetoken, deletetaskData } = require("../controller/taskController");

router.post(
    "/create/status",
    Status
)
router.get(
    "/taskdata/:id",
    TaskData
)
router.patch(
    "/updatestatus",
    UpdateTaskData
)
router.get(
    "/check/status",
    statusMatch
)
router.get(
    "/task/lookup",
    taskLookup
)
router.get(
    "/task/ne/lookup",
    tasknelookup
)
router.post(
    "/verifytoken",
    verifyToken,
)
router.post(
    "/decodetoken",
    decodetoken,
    TaskData
)
router.delete(
    "/deletetask/:id",
    deletetaskData
)
module.exports = {
    route: router
};

