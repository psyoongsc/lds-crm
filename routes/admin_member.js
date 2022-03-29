var express = require('express');
const getConnection = require('../config/database');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT USER.ID, USER.name, USER.phone, USER.email, DEPT.deptName, Position.posName FROM USER, DEPT, Position WHERE USER.deptID=DEPT.deptID AND USER.posID=Position.posID AND USER.isDelete=0 ORDER BY USER.deptID, USER.posID;';

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
    
    getConnection((conn) => {
        var sql = 'SELECT deptID, deptName FROM DEPT WHERE isDelete=0 ORDER BY deptID;'
        sql = sql + 'SELECT posID, posName FROM Position WHERE isDelete=0 ORDER BY posID;'
        conn.query(sql, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting dept list has problem\n' + err)
                res.render('error')
            }
            else {
                res.render('admin/user_manage/user_manage_create', {depts: rows[0], positions: rows[1]})
            }
        })

        conn.release();
    })
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

        conn.release();
    })
})

//유저 생성
router.post('/create', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'INSERT INTO USER(ID, PW, name, phone, email, deptID, posID) ';
        sql = sql + 'VALUES(?,?,?,?,?,?,?)';
        var body = req.body;
        var param = [body.id, body.pw, body.name, body.phone, body.email, body.dept, body.pos];

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] inserting user has problem\n' + err)
                res.render('error')
            }
            else {
                res.json('positive')
            }
        })
    })
})

//유저 수정 페이지
router.get('/update/:id', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT ID, name, phone, email, deptID, posID FROM USER WHERE ID=?;'
        sql = sql + 'SELECT deptID, deptName FROM DEPT WHERE isDelete=0 ORDER BY deptID;'
        sql = sql + 'SELECT posID, posName FROM Position WHERE isDelete=0 ORDER BY posID;'
        var param = [req.params.id]

        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting info for user update has problem\n' + err)
                res.render('error')
            }
            else {
                res.render('admin/user_manage/user_manage_update', {user: rows[0], depts: rows[1], positions: rows[2]})
            }
        })
    })
})

//유저 수정
router.post('/update', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'UPDATE USER SET name=?, phone=?, email=?, deptID=?, posID=? ';
        sql = sql + 'WHERE ID=?';
        var body = req.body;
        var param = [body.name, body.phone, body.email, body.dept, body.pos, body.id];

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] updating user has problem\n' + err)
                res.render('error')
            }
            else {
                res.json('positive')
            }
        })
    })
})

//유저 삭제
router.post('/remove', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'UPDATE USER SET isDelete=1 WHERE ID=?'
        var param = [req.body.id];

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] updating user has problem\n' + err);
                res.render('error')
            }
            else {
                res.json('positive')
            }
        })

        conn.release();
    })
})

module.exports = router;
