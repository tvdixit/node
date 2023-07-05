const express = require('express');
const router = express.Router();

const { Status, TaskData, UpdateTaskData, statusMatch, taskLookup, tasknelookup, verifyToken } = require("../controller/taskController");

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
module.exports = {
    route: router
};

