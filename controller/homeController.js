const dotenv = require("dotenv");
dotenv.config();
const User = require("../model/userModel");

exports.CreateNewUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        const newUser = new User({
            first_name,
            last_name,
            email,
            password
        });

        await newUser.save();
        res.send('Data saved to the database');
    } catch (err) {
        console.error('Error saving data:', err);
        res.status(500).send('Internal Server Error');
    }
};