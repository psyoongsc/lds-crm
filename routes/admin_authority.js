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

router.get('/user/update/:id', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT groupID, groupName FROM Groups;'

        conn.query(sql, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting group list has problem\n' + err);
                res.render('error');
            }
            else {
                res.render('admin/authority_manage/user_authority_manage_update', {id: req.params.id, groups: rows})
            }
        })
        conn.release();
    })
})

router.post('/user/update', function(req, res, next) {
    
    getConnection((conn) => {
        var sql = 'UPDATE USER SET groupID=? WHERE ID=?';
        var params = [req.body.authority, req.body.id];

        conn.query(sql, params, function(err) {
            if(err) {
                console.log('[ERROR] altering groupID has problem\n' + err)
                res.json('negative')
            }
            else {
                res.json('positive')
            }
        })
        conn.release();
    })
})

router.get('/group' ,function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT groupName FROM Groups ORDER BY groupID'
        
        conn.query(sql, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting group list has problem\n' + err)
                res.render('error');
            }
            else {
                res.render('admin/authority_manage/group_authority_manage_main', {group: rows});
            }
        })

        conn.release();
    })
})

router.get('/group/:id', function(req, res, next) {
    
    getConnection((conn) => {
        var sql = 'SELECT a.groupID, b.authorityID, b.authorityName, b.authorityDetail from (select * from GroupAuthority a where groupID=?) a right outer join Authority b on a.authorityID=b.authorityID ORDER BY b.authorityID;'
        var param = [req.params.id]

        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting authority list has problem\n' + err)
                res.render('error');
            }
            else {
                res.json({authority: rows});
            }
        })
    })
})

router.post

module.exports = router;
