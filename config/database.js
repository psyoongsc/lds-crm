const mysql = require('mysql');
const config = require('./db_config.json');

let pool = mysql.createPool(config);

function getConnection(callback) {
    pool.getConnection(function (err, conn) {
        if(!err) {
            callback(conn);
        }
        else {
            console.log('[ERROR] get connection pool is not working. check the database server status\n' + err);
            return;
        }
    })
}

module.exports = getConnection;