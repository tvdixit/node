const express = require("express");

const dbconnect = require("./config/db");
dbconnect();
const app = express();
app.use(express.json());

const { createUser, createEvent, createBooking, UserMatch } = require("./routes/index.js")

app.use("/user", createUser, createEvent, createBooking, UserMatch);

app.listen(4000, () => {
    console.log(`Server started at ${4000}`)
})