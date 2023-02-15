/*
* @Author: Ambuj Srivastava
* @Date: 19 may 2019
* @Last Modified by: Ambuj Srivastava
* @Last Modified On: 27 may 2019
*/


let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    userService = require('../Services/userAdmin');
const axios = require('axios');

var fileExtension = require('file-extension')
var crypto = require('crypto')
var multer = require('multer')
var fs = require('fs');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/var/www/html/QouchPotato/public/docs')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload = multer({ storage: storage });
let cpUpload = upload.fields([{ name: 'profilePicture', maxCount: 1 }]);

//Get All User
router.get('/getAllUser', (req, res) => {
    userService.getAllUser(req.body, (data) => {
        res.send(data);
    });
});

//Admin login page
router.post('/adminLogin', (req, res) => {
    userService.login(req.body, (data) => {
        res.send(data);
    });
});
router.get('/verifyForgotLink', (req, res) => {
    console.log(res,"Ambuj")
    userService.verifyForgotLink(req.query, (data) => {
        console.log(data,"test forgot")
        if (data.statusCode == 200) {
            var userData = {
                status: "success",
                msg: "Please update your passport here.",
                email: data.email
            }
        }
        else {
            var userData = {
                status: "failure",
                msg: data.statusMessage
            }
        }
        res.render('forgot_password_admin', userData);
    });

})


router.post('/updateForgotPassword', (req, res) => {
    userService.updateForgotPassword(req.body, (data) => {
        //console.log(data, "kdf")
        if (data.statusCode == 200) {
            res.end("200");
            //res.send(data);
        }
        else {
            res.end("400");
        }

    });
});

router.post('/forgotPassword', (req, res) => {
    userService.forgotPassword(req.body, (data) => {
        if (data.statusCode == 200) {
            //res.end("200");
            var userData = {
                statusCode: util.statusCode.OK,
                statusMessage: util.statusMessage.EMAIL_SENT
            }
        }
        // else if(data.status == 404){

        // }
        else {
            var userData = {
                statusCode: util.statusCode.FOUR_ZERO_ONE,
                statusMessage: util.statusMessage.EMAIL_NOT_REGISTERED
            }
        }
        res.send(userData);
    });
});
module.exports = router;