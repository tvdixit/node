const express = require("express");
const dbconnect = require("./config/db");
dbconnect();
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload());

app.use(express.json());
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const { createUser, createEvent, createBooking, UserpersonalData, UserTask, Review, Order, Home } = require("./routes/index.js")

app.use("/user", createUser.route);
app.use("/event", createEvent.route);
app.use("/booking", createBooking.route);
app.use("/personal", UserpersonalData.route);
app.use("/task", UserTask.route);
app.use("/review", Review.route);
app.use("/order", Order.route);
app.use("/home", Home.route);


require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

app.listen(4000, () => {
    console.log(`Server started at ${process.env.PORT}`);
})