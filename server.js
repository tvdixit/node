const express = require("express");
const dbconnect = require("./config/db");
dbconnect();

const app = express();
app.use(express.json());

const { createUser, createEvent, createBooking, UserMatch, subUser } = require("./routes/index.js")
app.use("/user", createUser, createEvent, createBooking, UserMatch, subUser);

const dotenv = require('dotenv');
dotenv.config();

app.listen(4000, () => {
    console.log(`Server started at ${process.env.PORT}`)
})