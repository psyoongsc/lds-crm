var express = require('express');
const getConnection = require('../config/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT ID, name FROM USER';

        conn.query(sql, function(err, rows, feilds) {
            if(err) {
                console.log('[ERROR] entering user_manage_main(admin) page has problem. \n' + err)
                res.render('error')
            }
            else {
                res.render('admin/user_manage/user_manage_main', { users: rows });
            }
        })
        conn.release();
    })
});

router.get('/update', function(req, res, next) {

})

module.exports = router;
