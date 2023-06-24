const mongoose = require("mongoose");
const url = "mongodb://0.0.0.0:27017/new_node";

async function dbconnect() {
    mongoose.connect(url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((res) => {
        console.log("database connected!");
    })
}
module.exports = dbconnect;