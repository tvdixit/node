const express = require("express");
const dbconnect = require("./config/db");
dbconnect();

const app = express();
app.use(express.json());

const { createUser, createEvent, createBooking, UserpersonalData, UserTask, Review, Order } = require("./routes/index.js")

app.use("/user", createUser.route);
app.use("/event", createEvent.route);
app.use("/booking", createBooking.route);
app.use("/personal", UserpersonalData.route);
app.use("/task", UserTask.route);
app.use("/review", Review.route);
app.use("/order", Order.route);


require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

app.listen(4000, () => {
    console.log(`Server started at ${process.env.PORT}`);
})