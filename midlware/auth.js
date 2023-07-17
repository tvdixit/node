// const Event_post = require("../model_Schema/event_PostModel")
const Like_post = require("../model_Schema/likeModel");
const User = require("../model_Schema/userModel");
const jwt = require("jsonwebtoken");
const user = require("../routes/user");
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
        if (user) {
            console.log(user, "user")
            req.user = { user_id: user.userId };
            next();
        } else {
            return res.status(400).json({
                status: 401,
                message: "Unauthorized",
            });
        }
    });
};

// verify token :
const verifyToken = (req, res) => {
    try {
        const token = req.header("authorization");
        console.log(token)
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verified);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}

module.exports = {
    auth,
    verifyToken
}