var express = require('express');
const getConnection = require('../config/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT USER.ID, USER.name, USER.phone, USER.email, DEPT.deptName, Position.posName FROM USER, DEPT, Position WHERE USER.deptID=DEPT.deptID AND USER.posID=Position.posID AND isDelete=0;';

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

//유저 생성 페이지
router.get('/create', function(req, res, next) {
    
    res.render('admin/user_manage/user_manage_create')
})

router.post('/iddupchk', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT count(*) FROM USER WHERE ID=? GROUP BY ID'
        var param = [req.body.id]

        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] id duplication check has problem\n' + err)
                res.render('error')
            }
            else {
                if(rows.length == 0)    res.json("positive")
                else                    res.json("negative")
            }
        })
    })
})

//유저 생성
router.post('/create', function(req, res, next) {

})

//유저 수정 페이지
router.get('/update/:id', function(req, res, next) {

})

//유저 수정
router.post('/update', function(req, res, next) {

})

//유저 삭제
router.post('/remove', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'UPDATE USER SET isDelete=1 WHERE ID=?'
        var param = [req.body.ID];

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] updating user has problem\n' + err);
                res.render('error')
            }
            else {
                res.json({result: "success"})
            }
        })
    })
})

module.exports = router;
