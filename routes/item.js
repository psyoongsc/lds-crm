var express = require('express');
var router = express.Router();

const getConnection = require('../config/database');

router.get('/', function(req, res, next) {
    var page = Number(req.query.page) || 1;
    var perPage = Number(req.query.perPage) || 10;
    var search = '%'+ (req.query.search || '') +'%';

    if(page < 1) page = 1;

    getConnection((conn => {
        var sql = 'SELECT code, itemName, CONCAT(FORMAT(price, 0), "원") as price FROM Item '
        sql = sql + 'WHERE LOWER(code) LIKE LOWER(?) OR  REPLACE(LOWER(itemName), " ", "") LIKE REPLACE(LOWER(?), " ", "") '
        sql = sql + 'LIMIT ?, ?;'
        sql = sql + 'SELECT count(*) as count FROM Item '
        sql = sql + 'WHERE LOWER(code) LIKE LOWER(?) OR  REPLACE(LOWER(itemName), " ", "") LIKE REPLACE(LOWER(?), " ", "") ORDER BY code;'
        var params = [search, search, perPage*(page-1), perPage, search, search];

        conn.query(sql, params, function(err, rows, fields) {
            if(err) {
                console.log('[ERROR] selecting item list has problem\n' + err);
                res.render('error');
            }
            else {
                res.render('layout/item_manage/main', {page: page, perPage: perPage, search: req.query.search || '', items: rows[0], counts: rows[1][0].count})
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