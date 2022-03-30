const getConnection = require('../../../config/database')

const crypto = require('crypto')

getHash = function(pw, salt) {
    const loginHash = crypto.createHash('sha512').update(pw + salt).digest('hex')
    
    return loginHash;
}

exports.storePWasHASH = function(ID, pw, callback) {
    const salt = crypto.randomBytes(128).toString('base64')
    const loginHash = getHash(pw, salt);

    console.log(salt.length);
    console.log(loginHash.length);

    getConnection((conn) => {
        var sql = 'UPDATE USER SET salt=?, loginHash=? WHERE ID=?;'
        var params = [salt, loginHash, ID];

        conn.query(sql, params, function(err) {
            callback(err);
        })

        conn.release();
    })
}

exports.comparePWwithHASH = function(ID, pw, callback) {

    getConnection((conn) => {
        var sql = 'SELECT salt, loginHash FROM USER WHERE ID=?';
        var param = [ID];

        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                callback(err, 'negative');
            }
            else {
                var salt = rows[0].salt;
                var loginHash = rows[0].loginHash;

                var digest = getHash(pw, salt);

                if(loginHash == digest) {
                    callback(err, 'positive');
                }
                else {
                    callback(err, 'negative');
                }
            }
        })

        conn.release();
    })
}