'use strict';

let dbConfig = require("../Utilities/dbConfig");


//Get All User By Admin
let getAllUser = (callback) => {

    dbConfig.getDB().query(`select * from user where 1 `, callback);
}

let getAdmin = (criteria, callback) => {
    let conditions = "";
    criteria.email ? conditions += `and email = '${criteria.email}'` : true;
    criteria.username ? conditions += `and username = '${criteria.username}'` : true;
    criteria.password ? conditions += `and password = '${criteria.password}'` : true;
 
 
    dbConfig.getDB().query(`select email,userName,password from admin where 1 ${conditions}`, callback);
    //console.log(`select userId,userName,email,profilePicture,gender,age,location,des,api_token from user where 1 ${conditions}`,"Set Data");    
}

// let getAllFabric = (criteria, callback) => {
   
//     dbConfig.getDB().query(`SELECT * FROM ${criteria.type}`, callback);
// }

let getUsers = (criteria, callback) => {
    let conditions = "";
    criteria.email ? conditions += ` and email = '${criteria.email}'` : true;
    criteria.password ? conditions += ` and password = '${criteria.password}'` : true;
    criteria.forgot_token ? conditions += ` and forgot_token = '${criteria.forgot_token}'` : true;
 
 
    dbConfig.getDB().query(`select * from admin where 1 ${conditions}`, callback);
    //console.log(`select userId,userName,email,profilePicture,gender,age,location,des,api_token from user where 1 ${conditions}`,"Set Data");    
 }

 let updateUser = (criteria, dataToSet, callback) => {

    //update keys
    let setData = "";
    dataToSet.password ? setData += `password = '${dataToSet.password}'` : true;
    dataToSet.forgot_token ? setData += ` forgot_token = '${dataToSet.forgot_token}'` : true;
 
    let conditions = "";
    criteria.email ? conditions += `AND email ='${criteria.email}'` : true;
 
 
    dbConfig.getDB().query(`UPDATE admin SET ${setData} where 1 ${conditions} `, callback);
    //console.log(`UPDATE user SET ${setData} where 1 ${conditions} `,"pass");
 }

module.exports = {
    getAllUser,
    getAdmin,
    getUsers,
    updateUser,
}
