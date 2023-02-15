/*
* @Author: Ambuj Srivastava
* @Date: October 04, 2018
* @Last Modified by: Ambuj Srivastava
* @Last Modified On: 18-1-2019
*/


let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    userService = require('../Services/user');
const axios = require('axios');

var fileExtension = require('file-extension')
var crypto = require('crypto')
var multer = require('multer')
var fs = require('fs');

//var minSize = 1 * 1000 * 1000;
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/ProfileImage')
    },
    filename: function (req, file, cb) {
        
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + fileExtension(file.mimetype));
        });
    }
});
let upload = multer({ storage: storage });
let cpUpload = upload.fields([{ name: 'profilePicture', maxCount: 1 }]);

//limits: { fileSize: minSize }

/* User Sign Up. */
router.post('/signup', (req, res) => {
    userService.signup(req.body, (data) => {
        res.send(data);
    });
});

/**Resend otp */
router.post('/resendOTP', (req, res) => {
    userService.resendOTP(req.body, (data) => {
        res.send(data);
    });
});


/* User Login. */
router.post('/login', (req, res) => {
    userService.login(req.body, (data) => {
        res.send(data);
    });
});

/* Get OTP Verification. */
router.post('/getOtp', (req, res) => {
    userService.getOTP(req.body, (data) => {
        res.send(data);
    });
});

//User profile update
router.post('/editUserProfile', cpUpload, (req, res) => {
    userService.editUserProfile(req.body, req.files, (data) => {
        res.send(data);
    });
});

/** User complete profile */
router.post('/completeProfile', cpUpload, (req, res) => {
    userService.completeProfile(req.body, req.files, (data) => {
        res.send(data);
    });
});

/* API to update Profile. */
router.post('/updateProfile', cpUpload, (req, res) => {
    userService.updateProfile(req.body, req.files, (data) => {
        res.send(data);
    });
});

/* Fb Sign Up */
router.post('/LoginWithFacebook', (req, res) => {
    userService.LoginWithFacebook(req.body, (data) => {
        res.send(data);
    });
});

/* google Sign Up */
router.post('/LoginWithGoogle', (req, res) => {
    userService.LoginWithGoogle(req.body, (data) => {
        res.send(data);
    });
});

/* Change Password */
router.post('/changepassword', (req, res) => {
    console.log(req.body,"poooooo")
    userService.changePassword(req.body, (data) => {
        res.send(data);
    });
});


/* Update Settings Of User*/
router.post('/logOut', (req, res) => {
    userService.logOut(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateDevicetoken', (req, res) => {
    userService.updateDevicetoken(req.body, (data) => {
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
        res.render('forgot_password', userData);
    });

})

/* Code to verify email at the time of registration */
router.get('/emailVerification', (req, res) => {
    userService.emailVerification(req.query, (data) => {
       // console.log(data);
        if (data.statusCode == 200) {
            var userData = {
                status: "success",
                email: data.email
            }
        }
        else if (data.statusCode == 1) {
            var userData = {
                status: "already_verified",
                email: data.email
            }
        }
        else {
            var userData = {
                status: "failure"
            }
        }
        res.render('account_verification', userData);
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
        console.log(data,"post.....................")
        // if (data.statusCode == 200) {
        //     //res.end("200");
        //     var userData = {
        //         statusCode: util.statusCode.OK,
        //         statusMessage: util.statusMessage.EMAIL_SENT[data.lang]
        //     }
        // }
        // // else if(data.status == 404){

        // // }
        // else {
        //     var userData = {
        //         statusCode: util.statusCode.FOUR_ZERO_ONE,
        //         statusMessage: util.statusMessage.EMAIL_NOT_REGISTERED[data.lang]
        //     }
        // }
        res.send(data);
    });
});

router.get('/getUserList',(req, res) => {
    console.log(req.body,"post")
    userService.getUserList(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getUserDetail',(req, res) => {
    userService.getUserDetail(req.body, (data) => {
        res.send(data);
    });
});


router.post('/getUserCount',(req, res) => {
    userService.getUserCount(req.body, (data) => {
        res.send(data);
    });
});

router.post('/addAddress',(req, res) => {
    userService.addAddress(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getAddressList',(req, res) => {
    userService.getAddressList(req.body, (data) => {
        res.send(data);
    });
});

router.post('/removeAddress',(req, res) => {
    userService.removeAddress(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getUserProfileDetails',(req, res) => {
    userService.getUserDetails(req.body, (data) => {
        res.send(data);
    });
});

router.post('/updateIsSelected', (req, res) => {
    userService.updateIsSelected(req.body, (data) => {
        res.send(data);
    });
});

router.post('/getAddressForAdmin', (req, res) => {
    userService.getUserAddressForAdmin(req.body, (data) => {
        res.send(data);
    });
});

module.exports = router;