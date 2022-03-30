var express = require('express');
var router = express.Router();

const getConnection = require('../config/database');
const authorityCheck = require('../public/javascripts/module/authority');

router.get('/', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT deptID, deptName FROM DEPT WHERE isDelete=0 ORDER BY deptID;'
        sql = sql + 'SELECT posID, posName FROM Positions WHERE isDelete=0 ORDER BY posID;'

        conn.query(sql, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting dept, pos list has problem\n' + err);
                res.render('error');
            }
            else {
                res.render('admin/dept_manage/manage_main', {dept: rows[0], pos: rows[1]})
            }
        })

        conn.release();
    })
})

router.get('/dept/create', function(req, res, next) {
    
    res.render('admin/dept_manage/dept_manage_create')
})
router.post('/dept/create', function(req, res, next) {

    getConnection((conn) => {

        var sql = 'INSERT INTO DEPT(deptName) VALUES(?);'
        var param = [req.body.deptName];

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] createing new dept has problem\n' + err);
                res.render('error');
            }
            else {
                res.json('positive');
            }
        })

        conn.release();
    })
})
router.get('/dept/update/:id', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT deptID, deptName FROM DEPT WHERE deptID=?'
        var param = [req.params.id];

        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting dept name has problem\n' + err)
                res.render('error')
            }
            else {
                res.render('admin/dept_manage/dept_manage_update', {dept: rows})
            }
        })
    })
})
router.post('/dept/update', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'UPDATE DEPT SET deptName=? WHERE deptID=?;'
        var params = [req.body.deptName, req.body.deptID];

        conn.query(sql, params, function(err) {
            if(err) {
                console.log('[ERROR] updating dept has problem\n' + err)
                res.render('error');
            }
            else {
                res.json('positive')
            }
        })

        conn.release();
    })
})
router.post('/dept/delete', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'UPDATE DEPT SET isDelete=1 WHERE deptID=?;'
        var param = [req.body.deptID]

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] deleting dept has problem\n' + err)
                res.render('error');
            }
            else {
                res.json('positive')
            }
        })

        conn.release();
    })
})

router.get('/position/create', function(req, res, next) {

    res.render('admin/dept_manage/pos_manage_create')
})
router.post('/position/create', function(req, res, next) {

    getConnection((conn) => {

        var sql = 'INSERT INTO Positions(posName) VALUES(?);'
        var param = [req.body.posName];

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] createing new position has problem\n' + err);
                res.render('error');
            }
            else {
                res.json('positive');
            }
        })

        conn.release();
    })
})
router.get('/position/update/:id', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'SELECT posID, posName FROM Positions WHERE posID=?'
        var param = [req.params.id];

        conn.query(sql, param, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting pos name has problem\n' + err)
                res.render('error')
            }
            else {
                res.render('admin/dept_manage/pos_manage_update', {pos: rows})
            }
        })
    })
})
router.post('/position/update', function(req, res, next) {

    getConnection((conn) => {
        var sql = 'UPDATE Positions SET posName=? WHERE posID=?;'
        var params = [req.body.posName, req.body.posID];

        conn.query(sql, params, function(err) {
            if(err) {
                console.log('[ERROR] updating position has problem\n' + err)
                res.render('error');
            }
            else {
                res.json('positive')
            }
        })

        conn.release();
    })
})
router.post('/position/delete', function(req, res, next) {
    
    getConnection((conn) => {
        var sql = 'UPDATE Positions SET isDelete=1 WHERE posID=?;'
        var param = [req.body.posID]

        conn.query(sql, param, function(err) {
            if(err) {
                console.log('[ERROR] deleting dept has problem\n' + err)
                res.render('error');
            }
            else {
                res.json('positive')
            }
        })

        conn.release();
    })
})

module.exports = router;