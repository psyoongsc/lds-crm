var express = require('express');
var router = express.Router();

const getConnection = require('../config/database');

router.get('/', function(req, res, next) {
    var page = Number(req.query.page) || 1;
    var perPage = Number(req.query.perPage) || 10;

    getConnection((conn => {
        var sql = 'SELECT code, itemName, price FROM Item LIMIT ?, ?;'
        var params = [page, perPage];

        conn.query(sql, params, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting item list has problem\n' + err);
                res.render('error');
            }
            else {
                res.render('layout/item_manage/main', {page: page, perPage: perPage, items: rows})
            }
        })

        conn.release();
    }))
})

router.get('/create', function(req, res, next) {
    
})

router.get('/update/:id', function(req, res, next) {
    
})

router.post('/update', function(req, res, next) {
    
})

router.post('/delete', function(req, res, next) {
    
})

module.exports = router;