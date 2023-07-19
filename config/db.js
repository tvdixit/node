const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function dbconnect() {
    mongoose.connect(process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((res) => {
        console.log("database connected!");
    })
}
module.exports = dbconnect;