let dbConfig = require("../Utilities/dbConfig");

let initialize = () => {
    dbConfig.getDB().query("create table IF NOT EXISTS user (userId INT auto_increment primary key, fullName VARCHAR(50), email VARCHAR(50), password VARCHAR(50),status INT,created_at DATETIME)");
}

module.exports = {
    initialize: initialize
}
