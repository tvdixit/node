const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const { createUser } = require("../controller/userController")
const upload = async (req, res) => {
    let storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './uploads')
        },
        filename: function (req, file, callback) {
            console.log(file)
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
    let upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            let ext = path.extname(file.originalname)
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
                return callback(res.end('Only images are allowed'), null)
            }
            callback(null, true)
        }
    }).single('userFile');
    upload(req, res, function (err) {
        res.end('File is uploaded')
    })
}
router.get('/h', (req, res) => {
    res.render('home')
})

router.post("/data", upload, createUser, (req, res) => {
    // const { first_name, last_name, email } = req.body;
    // console.log(req.body)


    console.log(student);
})

// app.use('/', router);
module.exports = {
    route: router
};