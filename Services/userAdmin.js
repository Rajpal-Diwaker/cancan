/*
* @Author: Ambuj Srivastava
* @Date: 27 may 2019
* @Last Modified by: Ambuj Srivastava
* @Last Modified On: 27 may 2019
*/

let async = require('async'),
    queryString = require('querystring');

let util = require('../Utilities/util'),
    userDAO = require('../DAO/userAdminDAO');

// Get All User By Admin
let getAllUser = (data, callback) => {
    async.auto({
        checkUserExistsinDB: (cb) => {

            userDAO.getAllUser((err, dbData) => {
                if (err) {
                    cb(null, { "statusCode": util.statusCode.INTERNAL_SERVER_ERROR, "statusMessage": util.statusMessage.DB_ERROR });

                } if (dbData && dbData.length) {
                  
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.FETCHED_SUCCESSFULLY, "result": dbData });
                } else {
                    cb(null, {
                        "statusCode": util.statusCode.OK, "statusMessage": "User comment not found", "result": []

                    })
                }

            })
        },

    }, (err, response) => {
        callback(response.checkUserExistsinDB);
    })
}

// Admin login 
let login = (data, callback) => {
    console.log(data,"post..............")
    async.auto({
        checkUserExistsinDB: (cb) => {

            if (!data.email || !data.password) {
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING.en })
                return;
            }
            var criteria = {}

            if(isNaN(data.email)){
                criteria.email =  data.email;
            }
            userDAO.getAdmin(criteria, (err, dbData) => {

                if (err) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.DB_ERROR.en })
                }
                if (dbData && !dbData.length) {
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": "User does not exist" });
                    return;
                } else {
                    var criteria = {}
                    if(isNaN(data.email)){
                        criteria.email =  data.email;
                        criteria.password= util.encryptData(data.password)

                    }
                    userDAO.getAdmin(criteria, (err2, dbData2) => {
                        console.log(err2,"ambuj")
                        if (err2) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.DB_ERROR.en })
                        }
                        if (dbData2 && !dbData2.length) {
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": "Please enter correct password" });
                            return;
                        } 
                        else {
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.LOGIN_SUCCESS.en,"result":dbData2[0] });  
                        }
                    })
                }
            });
        }
    }, (err, response) => {
        callback(response.checkUserExistsinDB);
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
                    util.sendEmailByAdmin({ "email": data.email, "forgot_token": forgot_token });
                    cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.EMAIL_SENT });
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

module.exports = {
    getAllUser,
    login,
    forgotPassword,
    verifyForgotLink,
    updateForgotPassword,
}