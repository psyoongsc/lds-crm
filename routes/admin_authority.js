var express = require('express');
const getConnection = require('../config/database');
var router = express.Router();

const authorityCheck = require('../public/javascripts/module/authority');

/* GET home page. */
router.get('/', function(req, res, next) {
    authorityCheck(req.session.user.id, 'AC002', function(result) {
        if(result == 'true') {
            res.render('admin/authority_manage/authority_manage_main');
        }
        else {
            res.redirect('/main');
        }
    })
});

router.get('/user', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT a.ID, a.name, b.groupName FROM USER a left join Groups b on a.groupID=b.groupID;';

        conn.query(sql, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting user authority has problem\n' + err);
                res.render('error');
            }
            else {
                res.render('admin/authority_manage/user_authority_manage_main', {users: rows});
            }
        })

        conn.release();
    })
})

router.get('/user/update', function(req, res, next) {
    res.render('admin/authority_manage/user_authority_manage_update')
})

module.exports = router;
