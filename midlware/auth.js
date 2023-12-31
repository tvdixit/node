const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
dotenv.config();

// decode token and get user_id :
const auth = () => async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        return res.status(400).json({
            status: 401,
            message: "No token provided.",
        });
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        return res.status(400).json({
            status: 401,
            message: "Invalid token.",
        });
    }
    const token = headerToken && headerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        // console.log(typeof (user.user_id));
        if (user) {
            // console.log(user, "user")
            // req.user = { user_id: user.userId, email: user.email }; ///for user
            req.user = { user_id: user.user_id, email: user.email }; // for event 

            // console.log(req.user, "req.user");
            next();
        } else {
            return res.status(400).json({
                status: 401,
                message: "Unauthorized",
            });
        }
    });
};

// login APi : 
const Userlogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await User.findOne({ email })
        console.log(users);
        if (!users) {
            return res.status(401).json("invalid email or password")
        }
        const matchPassword = await bcrypt.compare(password, users.password)
        if (!matchPassword) {
            res.status(400).json({ message: 'password not match Try again' })
        } else {
            const token = jwt.sign({ user_id: users._id, email }, process.env.SECRET_KEY, { expiresIn: '20000s' });
            res.status(200).json({ user_id: users._id, first_name: users.first_name, last_name: users.last_name, email: users.email, token })
        }
    } catch (err) {
        res.status(400).json({ message: "Error" });
        console.log(err);
    }
};

const authUser = () => async (req, res, next) => {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
        return res.status(400).json({
            status: 401,
            message: "No token provided.",
        });
    }
    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        return res.status(400).json({
            status: 401,
            message: "Invalid token.",
        });
    }
    const token = headerToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
        if (user) {
            req.user = { user };
            // console.log(req.user, "hello");
            next();
        } else {
            return res.status(400).json({
                status: 401,
                message: "Unauthorized",
            });
        }
    });
};

module.exports = {
    auth,
    Userlogin,
    authUser,

}