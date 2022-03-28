var express = require('express');
var router = express.Router();

var getConnection = require('../config/database');

var authorityCheck = require('../public/javascripts/module/authority')

/* GET home page. */
router.post('/login', function (req, res, next) {
    var id = req.body.id;
    var pw = req.body.pw;

    var params = [id, pw];

    var sql = 'SELECT ID, name FROM USER WHERE ID=? AND PW=?';
    getConnection((conn) => {
        conn.query(sql, params, function (err, rows, fields) {
            if(err) console.log('[ERROR] /login has some problems.. query is not executed.\n' + err)
            else {
                if(rows.length == 1 && rows[0].ID == id) {

                    authorityCheck(rows[0].ID, 'AC001', function(result) {
                        if(result == 'true') {
                            console.log('\x1b[33m%s\x1b[0m', '[INFO] user login success! USER: ' + id); 
                    
                            //create session
                            req.session.user = {
                                id: rows[0].ID,
                                name: rows[0].name,
                                authorized: true
                            }
        
                            res.redirect('/main');  
                        }
                        else {
                            console.log('\x1b[33m%s\x1b[0m', '[INFO] user login failed.. USER: ' + id + ' has not enogh authority');
                            res.render('index')
                        }
                    })
                }
                else {
                    console.log('\x1b[33m%s\x1b[0m', '[INFO] user login failed.. USER: ' + id + ' typed wrong password');
                    res.render('index')
                }
            }
        });
        conn.release();
    })
})

router.get('/logout', function (req, res, next) {
    if(req.session.user) {
        console.log('\x1b[33m%s\x1b[0m', '[INFO] user logout. USER: ' + `${req.session.user.id}`);

        req.session.destroy(function(err) {
            if(err) {
                console.log('[ERROR] destroying session has problem\n' + err);
                throw err;
            }
            
            res.redirect('/');
        })
    }
    else {
        console.log('\x1b[33m%s\x1b[0m', '[WARN] not permitted access(logout)');
        res.redirect('/');
    }
})

module.exports = router;
