/*
* @Author: Ambuj Srivastava
* @Date: May 22 2019
* @Last Modified by: Ambuj Srivastava
* @Last Modified On: may 22 2019
*/

let async = require('async'),
    queryString = require('querystring');

let util = require('../Utilities/util'),
    userDAO = require('../DAO/userDAO');
// var Client = require('node-rest-client').Client;
// var client = new Client();
//var brain = require('brainjs');

var accountSid = 'AC4c7a73b1eb092fb229b26e5f00501ec8'; // Your Account SID from www.twilio.com/console
var authToken = '33705806fc743cf236f9a795b3c96700';   // Your Auth Token from www.twilio.com/console
const client = require('twilio')(accountSid, authToken);



// user signup 
let signup = (data, callback) => {
    console.log(data,"anvujvdvkdfg")
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.email) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                email: data.email
            }
            userDAO.getUsers(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                    return;
                }
                if (dbData && dbData.length) {

                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.USER_EXISTS[data.lang] });
                    return;
                } else {
                    cb(null)

                }
            });
        },
        createUserinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            //var otp = util.generateOtp();
            var otp = '1111';

            let dataToSet = {
                "userName": (data.userName) ? data.userName : "",
                "password": util.encryptData(data.password),
                "email": data.email,
                "countryCode":data.countryCode?data.countryCode:971,
                "mobileNumber": data.mobileNumber,
                "facebookId": data.facebookId ? data.facebookId : '',
                "googleId": data.googleId ? data.googleId : '',
                "otp": otp,
                "loginStatus": "1",
                "profilePicture":"",
                "gender" : "",
                "age" : "",
                "location": data.location?data.location:'',
                "device_token":"",
                "isOtpVerified":'',
                "forgot_token":''
            }
            userDAO.createUser(dataToSet, (err, dbData) => {
                console.log(err, "post .signup")
               // console.log(dbData.insertId, "Ambuj..signup")
                
                client.messages.create({ body: otp, from: '+18508208164', to: '+91' + data.mobileNumber }
                ).then(message => console.log(message.body, "OTP"));
                var criteria = {
                    userId: dbData.insertId
                }
                userDAO.getUsers(criteria, (err, dbData) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                        return;
                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.USER_ADDED[data.lang],result:dbData[0] });

                })

               

            });
        }]
    }, (err, response) => {
        callback(response.createUserinDB);
    });
}

//resend otp
let resendOTP = (data, callback) => {

    async.auto({
        addProductInDB: (cb) => {
            var criteria = {
                "mobileNumber": data.mobileNumber,
            }
            //var otp = util.generateOtp();
            var otp = '1111';

            let dataToSet = {
                "otp": otp,
            }
            userDAO.updateOTP(criteria, dataToSet, (err, dbData) => {
                client.messages.create({
                    body: otp, from: '+18508208164', to: '+91' + data.mobileNumber
                }).then(message => { });
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage":util.statusMessage.RESEND_OTP[data.lang] });
            })
        },
    }, (err, response) => {
        callback(response.addProductInDB);
    })
}

// user login
let login = (data, callback) => {
    console.log(data,"test................")
    async.auto({
        checkUserExistsinDB: (cb) => {

            if (!data.email || !data.password) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {}

            if (isNaN(data.email)) {
                criteria.email = data.email;
            } else {
                criteria.mobileNumber = data.email;
            }
            userDAO.getUsers(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                }

                if (dbData && !dbData.length) {

                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.USER_NOT_FOUND[data.lang] });
                    return;


                } else {
                    var criteria = {
                        password: util.encryptData(data.password)
                    }
                    if (isNaN(data.email)) {
                        criteria.email = data.email;
                    } else {
                        criteria.mobileNumber = data.email;
                    }
                    userDAO.getUsers(criteria, (err2, dbData2) => {
                        if (err2) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                        }
                        if (dbData2 && !dbData2.length) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage":util.statusMessage.INCORRECT_PASSWORD[data.lang] });
                            return;
                        }
                        else {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGIN_SUCCESS[data.lang], result: dbData[0] });
                        }
                    })
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

//otp verification
let getOTP = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {

            if (!data.mobileNumber || !data.otp) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                "mobileNumber": data.mobileNumber,
            }

            userDAO.getOtp(criteria, (err, dbData) => {
                console.log(err, "ambuj........")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                }

                if (dbData && !dbData.length) {

                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.MOBILE_NO_NOT_MATCH[data.lang] });
                    return;

                } else {
                    var criteria = {
                        "mobileNumber": data.mobileNumber,
                        "otp": data.otp
                    }
                    userDAO.getOtp(criteria, (err, dbData) => {
                      

                            if (err) {
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                            } if (dbData && !dbData.length) {
    
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.OTP_NOT_MATCH[data.lang] });
                                return;
    
                            } else {
                                var criteria = {
                                    "userId": data.userId,
                                }
                                var dataToSet = {
                                    "isOtpVerified":'1'
                                }
                                userDAO.updateVerifiedOTP(criteria,dataToSet, (err, userData) => { 
                                    
                                    userDAO.getUsers(criteria, (err, userData) => { 
                                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.OTP_VERIFICATION[data.lang], result:userData[0] });
                                    })
                                })
                              
                            }
                      
                    })
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// update user status
let updateStatus = (data, token, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.email || !token) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                email: data.email
            }

            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }
                console.log(dbData);
                if (dbData && dbData.length == 0) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INCORRECT_EMAIL[data.lang] });
                    return;
                }
                if (dbData && dbData.length) {
                    if (token != dbData[0].token) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INVALID_TOKEN[data.lang] });
                        return;
                    }
                    cb(null);
                }
            });

            // code to validate token.....
        },
        updateStatusinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            var criteria = {
                email: data.email
            }
            var dataToSet = {
                "profileStatus": data.profileStatus
            }
            userDAO.updateUser(criteria, dataToSet, {}, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.STATUS_UPDATED[data.lang] });
                return;

            })
        }]
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })


}

// complete user profile
let completeProfile = (data, files, callback) => {
    // console.log(data, "data Test")
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId
            }

            userDAO.getUsers(criteria, (err, dbData) => {
                // console.log(dbData, "Get user Data")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                } else {

                    let criteria = {
                        userName: data.userName
                    }
                    userDAO.getUsers(criteria, (err, dbData2) => {
                        //console.log(criteria, "Ambuj")
                        if (dbData2 && dbData2.length > 0) {
                            cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.USERNAME[data.lang] });
                            return;
                        }
                        else {
                            cb(null);
                        }
                    })

                }
                // if(dbData && dbData.length == 0){
                //     cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.USER_NOT_FOUND});
                //     return;
                // }
                // // if(dbData && dbData.length){
                // //     if(token != dbData[0].token){
                // //         cb(null,{"statusCode":util.statusCode.BAD_REQUEST,"statusMessage":util.statusMessage.INVALID_TOKEN});
                // //         return;
                // //     }
                // cb(null);
                // }
            });

            // code to validate token.....
        },
        updateStatusinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            var criteria = {
                userId: data.userId
            }
            let profile_image;

            if (files && files.profilePicture && files.profilePicture[0].filename && files.profilePicture[0].size > 0) {
                profile_image = files.profilePicture[0].filename;
            }
            var dataToSet = {
                "userName": data.userName,
                "location": data.location,
                "gender": data.gender,
                "age": data.age,
                "des": (data.des) ? data.des : ' ',
                "genre": data.genre ? data.genre : ""

            }

            if (profile_image && profile_image != "") {
                dataToSet.profilePicture = profile_image
            }
            //console.log(dataToSet, "Check Image")
            userDAO.updateUser(criteria, dataToSet, (err, dbData) => {
                //  console.log(dataToSet, "rer")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                dataToSet2 = {
                    "userId": data.userId,
                    "genre": data.genre ? data.genre : ""
                }
                userDAO.addUserGenre(dataToSet2, (err, dbData) => {
                    //console.log(dataToSet,"post")
                    // cb(null)
                });
                // var criteria = {
                //     userId: data.userId
                // }
                // userDAO.getUsers(criteria, (err, dbData) => {
                //     if (err) { 
                //         cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang]})
                //         return;
                //     }

                //     if (dbData && dbData.length) {
                //         dbData[0].userId = dbData[0].userId.toString();
                //         dbData[0].age = dbData[0].age.toString();
                //         cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.STATUS_UPDATED[data.lang],"result":dbData[0]});                    
                //         return;
                //     }
                // });

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.STATUS_UPDATED[data.lang], "result": dataToSet });


            })
        }]
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })


}

// update user profile
let updateProfile = (data, files, callback) => {
    // console.log(data, "data Test")
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId
            }

            userDAO.getUsers(criteria, (err, dbData) => {
                //  console.log(dbData, "Get user Data")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }
                // if(dbData && dbData.length){
                //     cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.USER_NOT_FOUND});
                //     return;
                // }
                cb(null);
            });

            // code to validate token.....
        },
        updateStatusinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            var criteria = {
                userId: data.userId
            }
            let profile_image;

            if (files && files.profilePicture && files.profilePicture[0].filename && files.profilePicture[0].size > 0) {
                profile_image = files.profilePicture[0].filename;
            }
            var dataToSet = {
                "location": data.location,
                "gender": data.gender,
                "age": data.age,
                "des": (data.des) ? data.des : ' ',

            }

            if (profile_image && profile_image != "") {
                dataToSet.profilePicture = profile_image
            }
            // console.log(dataToSet, "Check Image")
            userDAO.updateUsers(criteria, dataToSet, (err, dbData) => {
                //  console.log(dataToSet, "rer")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.STATUS_UPDATED[data.lang], "result": dataToSet });


            })
        }]
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })


}

// change password
let changePassword = (data, callback) => {
    console.log(data, "Ambuj00000")
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId || !data.old_password) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId,
                password: util.encryptData(data.old_password)
            }

            userDAO.getUsers(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                    return;
                }

                if (dbData && dbData.length) {
                    cb(null);
                } else {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INCORRECT_PASSWORD[data.lang] });
                }
            });
        },
        updatePasswordInDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB && functionData.checkUserExistsinDB.statusCode) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }

            var criteria = {
                userId: data.userId,
            }
            var dataToSet = {
                "password": util.encryptData(data.new_password),
            }
            userDAO.updateUser(criteria, dataToSet, (err, dbData) => {
                // console.log(err, "Ambuj>>>>>>>>>>>...")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                    return;
                }

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.PASSWORD_CHANGED[data.lang] })
            });
        }]
    }, (err, response) => {
        callback(response.updatePasswordInDB);
    });

}

// user logout 
let logOut = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId
            }

            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] });
                    return;
                }
                if (dbData && dbData.length == 0) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INCORRECT_EMAIL[data.lang] });
                    return;
                }
                var criteria = {
                    userId: dbData[0].userId
                }
                var dataToSet = {
                    "profileStatus": "0",
                    "device_token": " "
                }
                userDAO.updateUser(criteria, dataToSet, (err, dbData) => {
                    //   console.log(dbData, "kdnflsd     ")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] });
                        return;
                    }
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGOUT[dat.lang] });
                    return;

                })
            });

        },

    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })

}

// login with facebook
let LoginWithFacebook = (data, callback) => {

    async.auto({
        checkUserExistsinDB: (cb) => {

            if(!data.email && data.facebookId){
                        var criteria = {
                            "facebookId": data.facebookId
                        }
                        userDAO.getUsers(criteria, (err, dbData) => {
                            console.log(criteria,dbData, err, "email test")
                            if (err) {
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                                return;
                            } if (dbData && dbData.length) {
                                console.log("test....................",dbData)
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": "old",toRegister:0 });
            
                            } else { 
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE[data.lang], "result": dbData[0], "user_status": "new",toRegister:1 });
                            }
                        })
            
            }
            else if (data.facebookId && data.email){
                if (!data.facebookId) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                    return;
                }
            
                var criteria = {
                    "facebookId": data.facebookId,
                }
                userDAO.getUsers(criteria, (err, dbData) => {
                    console.log(dbData, "pfsfsdfd")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                        return;
                    }
                    if (dbData && dbData.length) {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": "old" ,toRegister:0});
                    }
            
                    else {
                        var criteria = {
                            "email": data.email
                        }
                        userDAO.getUsers(criteria, (err, dbData) => {
                            console.log(criteria, err, "post")
                            if (err) {
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                                return;
                            } if (dbData && dbData.length) {
            
                                var dataToSet = {
                                    facebookId: data.facebookId
                                }
                                userDAO.updateSocialFb(criteria, dataToSet, (err, dbData) => {
            
                                })
            
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": util.statusMessage.UPDATA_FB_ID[data.lang],toRegister:0 });
            
                            } else { 
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE[data.lang], "result": dbData[0], "user_status": "new",toRegister:1 });
                                return;                            }
                        })
            
            
                    }
                });
            }
            else{
                if (!data.facebookId) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                    return;
                }
    
                var criteria = {
                    facebookId: data.facebookId
                }
                userDAO.getUsers(criteria, (err, dbData) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                        return;
                    }
                    if (dbData && dbData.length) {
                        var criteria = {
                            "facebookId": data.facebookId
                        }
                        userDAO.getUsers(criteria, (err, dbData) => {
                            console.log(criteria, err, "post")
                            if (err) {
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                                return;
                            } if (dbData && dbData.length) {
            
                                var dataToSet = {
                                    email: data.email
                                }
                                userDAO.updateEmailId(criteria, dataToSet, (err, dbData) => {
            
                                })
            
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN, "result": dbData[0], "user_status": util.statusMessage.UPDATE_EMAIL_ID[data.lang],toRegister:0 });
            
                            } else { 
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Not Found" });
                            }
                        })
                       // cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN, "result": dbData[0], "user_status": "old test" });
                    } else {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE[data.lang], "result": dbData[0], "user_status": "new",toRegister:1 });
                        return;
                    }
                });
            }
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// login with google
let LoginWithGoogle = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {

            if(!data.email && data.googleId){
                var criteria = {
                    "googleId": data.googleId
                }
                userDAO.getUsers(criteria, (err, dbData) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                        return;
                    }
                    if (dbData && dbData.length) {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": "old",toRegister:0 });
                    } else {
                       
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE[data.lang], "result": dbData[0], "user_status": "new",toRegister:1 });
                    return;
                    }
                });
            }
            else if(data.googleId && data.email){
                if (!data.googleId) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                    return;
                }
            
                var criteria = {
                    "googleId": data.googleId,
                }
                userDAO.getUsers(criteria, (err, dbData) => {
                    console.log(dbData, "pfsfsdfd")
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                        return;
                    }
                    if (dbData && dbData.length) {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": "old" ,toRegister:0});
                    }
            
                    else {
                        var criteria = {
                            "email": data.email
                        }
                        userDAO.getUsers(criteria, (err, dbData) => {
                            console.log(criteria, err, "post")
                            if (err) {
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                                return;
                            } if (dbData && dbData.length) {
            
                                var dataToSet = {
                                    googleId: data.googleId
                                }
                                userDAO.updateSocialGoogle(criteria, dataToSet, (err, dbData) => {
            
                                })
            
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": util.statusMessage.UPDATE_GOOGLE_ID[data.lang],toRegister:0 });
            
                            } else { 
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE[data.lang], "result": dbData[0], "user_status": "new",toRegister:1 });
                                return;                            }
                        })
            
            
                    }
                });
            }
            else{
                var criteria = {
                    googleId: data.googleId
                }
                userDAO.getUsers(criteria, (err, dbData) => {
                    if (err) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                        return;
                    }
                    if (dbData && dbData.length) {
                        var criteria = {
                            "googleId": data.googleId
                        }
                        userDAO.getUsers(criteria, (err, dbData) => {
                            console.log(criteria, err, "post")
                            if (err) {
                                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                                return;
                            } if (dbData && dbData.length) {
            
                                var dataToSet = {
                                    email: data.email
                                }
                                userDAO.updateEmailId(criteria, dataToSet, (err, dbData) => {
            
                                })
            
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": util.statusMessage.UPDATE_GOOGLE_ID[data.lang],toRegister:0 });
            
                            } else { 
                                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Not Found" });
                            }
                        })
                       // cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGGED_IN[data.lang], "result": dbData[0], "user_status": "old test" });
                    } else {
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REGISTRATION_DONE[data.lang], "result": dbData[0], "user_status": "new",toRegister:1 });
                        return;
                    }
                });
            }
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// update device token
let updateDevicetoken = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.userId) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                userId: data.userId
            }
            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }if (dbData && dbData.length == 0) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.USER_NOT_FOUND[data.lang] });
                    return;
                }
                cb(null);
            });
        },
        updateStatusinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);
                return;
            }
            var criteria = {
                userId: data.userId
            }
            var dataToSet = {
                "device_type": data.device_type ? data.device_type : ' ',
                "device_token": data.device_token ? data.device_token : ' ',
                "tokenStatus": data.tokenStatus ? data.tokenStatus : '0'
            }
            userDAO.updateUserDevicetoken(criteria, dataToSet, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DEVICE_tOKEN_UPDATE[data.lang], "result": dataToSet });


            })
        }]
    }, (err, response) => {
        callback(response.updateStatusinDB);
    })

}

// forgot password
let forgotPassword = (data, callback) => {
    console.log(data, "Ambuj")
    async.auto({
        checkUserExistsinDB: (cb) => {

            if (!data.email) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                email: data.email
            }
            userDAO.getUsers(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                }

                if (dbData && dbData.length) {
                    var forgot_token = util.generateToken();
                    var criteria = {
                        email: data.email
                    }
                    var dataToSet = {
                        "forgot_token": forgot_token
                    }
                    userDAO.updateUser(criteria, dataToSet, {}, (err, dbData) => {
                        if (err) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                            return;
                        }
                    })
                    // code to send email...
                    util.sendEmail({ "email": data.email, "forgot_token": forgot_token });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.EMAIL_SENT[data.lang]});
                } else {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INCORRECT_EMAIL[data.lang] });
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// verify forgot link 
let verifyForgotLink = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.email || !data.forgot_token) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SOMETHING_WENT_WRONG[data.lang] })
                return;
            }
            var criteria = {
                email: data.email,
                forgot_token: data.forgot_token

            }

            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                }
                if (dbData && dbData.length) {
                    // code to send email...
                    cb(null, { "statusCode": util.statusCode.OK, "email": data.email });
                } else {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.INVALID_REQUEST, email: "" });
                }
            });

            // code to validate token.....
        }

    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

/* Code to update password from forgot page */
let updateForgotPassword = (data, callback) => {
    // console.log(data, "request came to services");
    async.auto({
        checkUserExistsinDB: (cb) => {
            if (!data.email || !data.password) {
                cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] })
                return;
            }
            var criteria = {
                email: data.email,
                // status : 1
            }
            userDAO.getUsers(criteria, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }
                if (dbData && dbData.length == 0) {
                    cb(null, { "statusCode": util.statusCode.BAD_REQUEST, "statusMessage": util.statusMessage.INCORRECT_EMAIL[data.lang] });
                    return;
                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.PASSWORD_CHANGED[data.lang] });
            });

            // code to validate token.....
        },

        updatePasswordinDB: ['checkUserExistsinDB', (cb, functionData) => {
            if (functionData && functionData.checkUserExistsinDB) {
                cb(null, functionData.checkUserExistsinDB);

            }
            var criteria1 = {
                email: data.email
            }
            // console.log(criteria1, "Ambuj999");
            let newToken = util.generateToken();

            var dataToSet = {
                "password": util.encryptData(data.password),
                "emptyToken": "true",
                "api_token": newToken
            }
            //console.log(dataToSet, "jfkjds")
            userDAO.updateUser(criteria1, dataToSet, {}, (err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });
                    return;
                }
                // console.log(dbData, "Ambuj")
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.PASSWORD_UPDATED });
                return;

            })
        }]
    }, (err, response) => {
        callback(response.updatePasswordinDB);
    })


}

/** Get user list */
let getUserList = (data, callback) => {
    async.auto({
        getUserListinDB: (cb) => {

            userDAO.getUserList((err, dbData) => {
                console.log(dbData, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY, "result": dbData });
                }
            });
        }

    }, (err, response) => {
        callback(response.getUserListinDB);
    })
}

/**Get User Detail */
let getUserDetail = (data, callback) => {
    async.auto({
        getUserListinDB: (cb) => {

            var criteria = {
                userId: data.userId
            }

            userDAO.getUserDetail(criteria, (err, dbData) => {
                console.log(err, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY, "result": dbData[0] });
                }
            });
        }

    }, (err, response) => {
        callback(response.getUserListinDB);
    })
}


/**Get user count */
let getUserCount = (data, callback) => {
    async.auto({
        getDataFromDB: (cb) => {

            userDAO.getUserCount((err, dbData) => {
                userDAO.getOrderCount((err, orderCount) => {
                    userDAO.getRevenue((err, revenueCount) => {

                console.log(err, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY, "result": dbData[0], "count":orderCount[0],"revenue":revenueCount[0] });
                }
            })
            })
            });
        }

    }, (err, response) => {
        callback(response.getDataFromDB);
    })
}

/**Add User Address*/
let addAddress = (data, callback) => {
    async.auto({
        addDataInDB: (cb) => {
            var dataToSet = {
                userId: data.userId,
                landMark:data.landMark?data.landMark:'',
                contactName:data.contactName,
                countryCode:data.countryCode?data.countryCode:'',
                mobileNumber:data.mobileNumber?data.mobileNumber:'',
                address:data.address,
                addressType:data.addressType,
                lat:data.lat,
                lng:data.lng,
            }
            userDAO.addAddress(dataToSet,(err, dbData) => {
                console.log(dataToSet,err, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.ADD_ADDRESS[data.lang]});
                }
            });
        }

    }, (err, response) => {
        callback(response.addDataInDB);
    })
}

/**Get User Address*/
let getAddressList = (data, callback) => {
    async.auto({
        getDataInDB: (cb) => {
            var criteria = {
                userId: data.userId,
            }
            userDAO.getUserAddress(criteria,(err, dbData) => {
                console.log(dbData,err, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang],"result":dbData});
                }
            });
        }
    }, (err, response) => {
        callback(response.getDataInDB);
    })
}

/**Remove User Address*/
let removeAddress = (data, callback) => {
    async.auto({
        removeDataInDB: (cb) => {
            var criteria = {
                userDetailId: data.userDetailId,
            }
            userDAO.removeAddress(criteria,(err, dbData) => {
                console.log(dbData,err, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.REMOVE_ADDRESS[data.lang]});
                }
            });
        }
    }, (err, response) => {
        callback(response.removeDataInDB);
    })
}
/***************************Get User Profile*******************************/

// Get user detail 
let userDetail = (criteria, cb) => {
    userDAO.getUsers(criteria, (err, dbSubData) => {
        if (err) {
            console.log(err,"kamal");
            
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

// Get user address
let userAddress = (criteria, cb) => {
    userDAO.getUserAddress(criteria, (err, dbSubData) => {
        if (err) {
            cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
        }
        cb(null, dbSubData);
    })
}

//User Details API 
let getUserDetails = (data, callback) => {
    async.parallel({
        userDetails: (cb) => {
            var criteria = {
                userId: data.userId
            }
            userDetail(criteria, (err, response) => {
                console.log(response,"post")
                cb(null, response);
            });
        },

        address: (cb) => {
            var criteria = {
                userId: data.userId,
            }
            userAddress(criteria, (err, response) => {

                cb(null, response);
            });
        },
     
    }, (err, response) => {
        let res1 = {};
        res1.userDetails = response.userDetails[0];
        res1.address = response.address;
        response.userDetails.forEach(element => {
            element.profilePicture = util.productUrl()+'ProfileImage/'+element.profilePicture
        });
          
        callback({ "statusCode": util.statusCode.OK, "statusMessage":util.statusMessage.USER_DATA[data.lang], "result": res1 });
    }),
        (err) => {
            callback(err);
        }

}

//Update User Profile 
let editUserProfile = (data, files, callback) => {
    console.log( data , "Ambuj" )
    async.auto({
        editDataInDB: (cb) => {
            if(!data.userId){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                 "userId":data.userId
            }
            var dataToSet = {
                "userName": data.userName?data.userName:'',
                "countryCode" : data.countryCode?data.countryCode:'',
                "mobileNumber": data.mobileNumber?data.mobileNumber:'',
                "location" : data.location?data.location:''
                //"clothImage": files.clothImage[0].filename,
            }  
            if(files.profilePicture!=undefined){                
                dataToSet.profilePicture = files.profilePicture[0].filename
            }           
            userDAO.updateUser(criteria,dataToSet, (err, dbData) => {
                console.log(err,"Ambuj")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "User data updated successfully" });
            })
        },
     
    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

/************************************************************************************ */
let updateIsSelected = (data, callback) => {
    console.log(data,"Ambuj")
    async.auto({
        editDataInDB: (cb) => {
            if(!data.userId){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_FOUR, "statusMessage": util.statusMessage.PARAMS_MISSING[data.lang] });
            }
            var criteria = {
                userId:data.userId
            }
            var dataToSet = {
                "isSelected": '0',
            }           
            userDAO.notSecleted(criteria,dataToSet, (err, dbData) => {
                console.log(err,"post")
               
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR[data.lang] });

                }
                var criteria2 = {
                    userDetailId:data.userDetailId
                }
                var dataToSet = {
                    "isSelected": '1',
                }  
                userDAO.isSecleted(criteria2,dataToSet, (err, dbData) => {})

                cb(null, { "statusCode": util.statusCode.OK, "statusMessage": "Update successfully" });
            })
        },
     
    }, (err, response) => {
        callback(response.editDataInDB);
    })
}

let getUserAddressForAdmin = (data, callback) => {
    async.auto({
        getDataFromDB: (cb) => {
            var criteria = {
                 userId : data.userId
            }
            userDAO.getUserAddress(criteria,(err, dbData) => {
                console.log(err, "log")
                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ZERO, "statusMessage": util.statusMessage.DB_ERROR[data.lang] })
                } else {
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY[data.lang], "result": dbData });
                }
            });
        }

    }, (err, response) => {
        callback(response.getDataFromDB);
    })
}


module.exports = {
    signup,
    login,
    forgotPassword,
    verifyForgotLink,
    updateStatus,
    completeProfile,
    logOut,
    updateForgotPassword,
    LoginWithFacebook,
    changePassword,
    LoginWithGoogle,
    updateProfile,
    updateDevicetoken,
    getOTP,
    resendOTP,
    getUserList,
    getUserDetail,
    getUserCount,
    addAddress,
    getAddressList,
    removeAddress,
    getUserDetails,
    editUserProfile,
    updateIsSelected,
    getUserAddressForAdmin,

};

