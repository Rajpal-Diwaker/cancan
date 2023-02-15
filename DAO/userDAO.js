'use strict';

let dbConfig = require("../Utilities/dbConfig");


let createUser = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into user set ? ", dataToSet, callback);

}

let addAddress = (dataToSet, callback) => {
   dbConfig.getDB().query("insert into userDetails set ? ", dataToSet, callback);

}

let updateUser = (criteria, dataToSet, callback) => {

   //update keys
   let setData = "";
   dataToSet.userName ? setData += `userName = '${dataToSet.userName}'` : true;
   dataToSet.location ? setData += `,location = '${dataToSet.location}'` : true;
   dataToSet.mobileNumber ? setData += `,mobileNumber = '${dataToSet.mobileNumber}'` : true;
   dataToSet.countryCode ? setData += `,countryCode = '${dataToSet.countryCode}'` : true;
   dataToSet.profilePicture ? setData += `,profilePicture = '${dataToSet.profilePicture}'` : true;
   dataToSet.password ? setData += `password = '${dataToSet.password}'` : true;
   dataToSet.profileStatus ? setData += `profileStatus = '${dataToSet.profileStatus}'` : true;
   dataToSet.loginStatus ? setData += `,loginStatus ='${dataToSet.loginStatus}'` : true;
   dataToSet.device_token ? setData += `,device_token = '${dataToSet.device_token}'` : true;
   dataToSet.forgot_token ? setData += ` forgot_token = '${dataToSet.forgot_token}'` : true;

   let conditions = "";
   criteria.userId ? conditions += `AND userId ='${criteria.userId}'` : true;
   criteria.email ? conditions += `AND email ='${criteria.email}'` : true;
   criteria.userName ? conditions += `AND userName ='${criteria.userName}'` : true;


   dbConfig.getDB().query(`UPDATE user SET ${setData} where 1 ${conditions} `, callback);
   //console.log(`UPDATE user SET ${setData} where 1 ${conditions} `,"pass");
}

let updateSocialFb = (criteria, dataToSet, callback) => {

   //update keys
   let setData = "";
  // dataToSet.googleId ? setData += `googleId = '${dataToSet.googleId}'` : true;
   dataToSet.facebookId ? setData += `facebookId = '${dataToSet.facebookId}'` : true;
  
   let conditions = "";
   criteria.email ? conditions += `AND email ='${criteria.email}'` : true;


   dbConfig.getDB().query(`UPDATE user SET ${setData} where 1 ${conditions} `, callback);
   //console.log(`UPDATE user SET ${setData} where 1 ${conditions} `,"pass");
}

let updateEmailId = (criteria, dataToSet, callback) => {

   //update keys
   let setData = "";
      dataToSet.email ? setData += `email = '${dataToSet.email}'` : true;
   // dataToSet.facebookId ? setData += `facebookId = '${dataToSet.facebookId}'` : true;
  
   let conditions = "";
   criteria.facebookId ? conditions += `AND facebookId ='${criteria.facebookId}'` : true;


   dbConfig.getDB().query(`UPDATE user SET ${setData} where 1 ${conditions} `, callback);
   //console.log(`UPDATE user SET ${setData} where 1 ${conditions} `,"pass");
}

let updateSocialGoogle = (criteria, dataToSet, callback) => {

   //update keys
   let setData = "";
    dataToSet.googleId ? setData += `googleId = '${dataToSet.googleId}'` : true;
   //dataToSet.facebookId ? setData += `facebookId = '${dataToSet.facebookId}'` : true;
  
   let conditions = "";
   criteria.email ? conditions += `AND email ='${criteria.email}'` : true;


   dbConfig.getDB().query(`UPDATE user SET ${setData} where 1 ${conditions} `, callback);
   //console.log(`UPDATE user SET ${setData} where 1 ${conditions} `,"pass");
}



let updateUserDevicetoken = (criteria, dataToSet, callback) => {

   let setData = "";
   dataToSet.device_token ? setData += `device_token = '${dataToSet.device_token}'` : true;
   dataToSet.device_type ? setData += `,device_type = '${dataToSet.device_type}'` : true;
   dataToSet.tokenStatus ? setData += `,tokenStatus = '${dataToSet.tokenStatus}'` : true;

   let conditions = "";
   criteria.userId ? conditions += `AND userId ='${criteria.userId}'` : true;

   dbConfig.getDB().query(`UPDATE user SET ${setData} where 1 ${conditions} `, callback);
}

let updateOTP = (criteria, dataToSet, callback) => {

   let setData = "";
   dataToSet.otp ? setData += `otp = '${dataToSet.otp}'` : true;

   let conditions = "";
   criteria.mobileNumber ? conditions += `AND mobileNumber ='${criteria.mobileNumber}'` : true;

   dbConfig.getDB().query(`UPDATE user SET ${setData} where 1 ${conditions} `, callback);
}

let updateVerifiedOTP = (criteria, dataToSet, callback) => {
   let setData = "";
   dataToSet.isOtpVerified ? setData += `isOtpVerified = '${dataToSet.isOtpVerified}'` : true;
   let conditions = "";
   criteria.userId ? conditions += `userId ='${criteria.userId}'` : true;
   dbConfig.getDB().query(`UPDATE user SET ${setData} where ${conditions} `, callback);
}

let getUsers = (criteria, callback) => {
   let conditions = "";
   criteria.email ? conditions += ` and email = '${criteria.email}'` : true;
   criteria.mobileNumber ? conditions += ` and mobileNumber = '${criteria.mobileNumber}'` : true;
   criteria.userName ? conditions += ` and userName = '${criteria.userName}'` : true;
   criteria.userId ? conditions += ` and userId = '${criteria.userId}'` : true;
   criteria.password ? conditions += ` and password = '${criteria.password}'` : true;
   criteria.facebookId ? conditions += ` and facebookId = '${criteria.facebookId}'` : true;
   criteria.googleId ? conditions += ` and googleId = '${criteria.googleId}'` : true;
   criteria.forgot_token ? conditions += ` and forgot_token = '${criteria.forgot_token}'` : true;
   criteria.login_status ? conditions += ` and login_status = '${criteria.login_status}'` : true;


   dbConfig.getDB().query(`select userId,facebookId,googleId,userName,email,mobileNumber,isOtpVerified,countryCode,profilePicture,gender,age,location,profileStatus,loginStatus,accountStatus,tokenStatus from user where 1 ${conditions}`, callback);
   //console.log(`select userId,userName,email,profilePicture,gender,age,location,des,api_token from user where 1 ${conditions}`,"Set Data");    
}

//Get otp
let getOtp = (criteria, callback) => {
   let conditions = "";
   criteria.mobileNumber ? conditions += ` and mobileNumber = '${criteria.mobileNumber}'` : true;
   criteria.otp ? conditions += ` and otp = '${criteria.otp}'` : true;
  
   dbConfig.getDB().query(`select userId,userName,email,mobileNumber from user where 1 ${conditions}`, callback);
}

let getUserDeviceToken = (criteria, callback) => {
   let conditions = "";

   criteria.postId ? conditions += ` and postId = '${criteria.postId}'` : true;

   dbConfig.getDB().query(`select user.userId,user.userName,user.profilePicture,user.device_token,
   post.postId,post.userId,post.platform from post INNER JOIN user ON user.userId = post.userId where 1 ${conditions}`, callback);
   //dbConfig.getDB().query(`select postId,userId,userName,profilePicture,device_type,device_token from user where 1 ${conditions}`, callback);
}

let getUserList = (callback) =>{
    var query = `Select userId,userName,mobileNumber,profilePicture,email,accountStatus,countryCode from user`
    dbConfig.getDB().query(query, callback)
}


let getUserDetail = (criteria, callback) => {
   let conditions = "";

   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query(`SELECT * FROM user WHERE ${conditions}`, callback);
}

let removeUser = (criteria, dataToSet, callback) => {
    //update keys
    let setData = "";
    dataToSet.device_token ? setData += `device_token = '${dataToSet.device_token}'` : true;
    let conditions = "";
    criteria.userId ? conditions += `userId ='${criteria.userId}'` : true;
 
    dbConfig.getDB().query(`UPDATE user SET ${setData} where ${conditions} `, callback);
}

let getUserCount = ( callback) => {

   dbConfig.getDB().query(`SELECT COUNT(userId) as userCount FROM user`, callback);
}
let getOrderCount = (callback) => {

   dbConfig.getDB().query(`SELECT COUNT(orderId) as COUNT FROM orderDetails ORDER BY createdAt DESC`, callback);
}

let getUserAddress = (criteria, callback) => {
   let conditions = "";

   criteria.userId ? conditions += `userId = '${criteria.userId}'` : true;

   dbConfig.getDB().query(`SELECT * FROM userDetails WHERE ${conditions}`, callback);
}

let removeAddress = (criteria, callback) => {
   var conditions = "";
   criteria.userDetailId ? conditions += `userDetailId = '${criteria.userDetailId}'` : true;
   dbConfig.getDB().query(`DELETE FROM userDetails where ${conditions} `, callback);
}

let notSecleted = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.isSelected ? setData += `isSelected = '${dataToSet.isSelected}'` : true;
    
   let conditions = "";
   criteria.userId ? conditions += `userId ='${criteria.userId}'` : true;

   dbConfig.getDB().query(`UPDATE userDetails SET ${setData} where ${conditions} `, callback);
}


let isSecleted = (criteria, dataToSet, callback) => {
   //update keys
   let setData = "";
    dataToSet.isSelected ? setData += `isSelected = '${dataToSet.isSelected}'` : true;
    
   let conditions = "";
   criteria.userDetailId ? conditions += `userDetailId ='${criteria.userDetailId}'` : true;

   dbConfig.getDB().query(`UPDATE userDetails SET ${setData} where ${conditions} `, callback);
}

let getRevenue = (callback) => {

   dbConfig.getDB().query(`SELECT SUM(od.price) as revenue FROM orderLIst as ol LEFT JOIN orderDetails as od on od.orderId = ol.orderId AND ol.orderStatus = 3`, callback);
}

module.exports = {
   createUser,
   updateUser,
   updateUserDevicetoken,
   getUsers,
   getUserDeviceToken,
   getOtp,
   updateOTP,
   getUserList,
   getUserDetail,
   removeUser,
   updateSocialFb,
   updateSocialGoogle,
   updateEmailId,
   getUserCount,
   updateVerifiedOTP,
   addAddress,
   getUserAddress,
   removeAddress,

   notSecleted,
   isSecleted,
   getOrderCount,
   getRevenue
}
