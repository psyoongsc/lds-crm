const getConnection = require('../../../config/database');

function authorityCheck(userID, authorityID, callback) {
    getConnection((conn) => {
        var sql = 'SELECT USER.ID FROM USER, GroupAuthority WHERE USER.ID=? AND GroupAuthority.authorityID=? AND USER.groupID=GroupAuthority.groupID;'
        var params = [userID, authorityID];

        conn.query(sql, params, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] checking authority has problem\n' + err)
                callback('error');
            }
            else {
                if(rows.length == 1 && (userID == rows[0].ID)) {
                    callback('true');
                }
                else {
                    callback('false');
                }
            }
        })
    })
}

module.exports = authorityCheck;