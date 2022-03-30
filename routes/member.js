var express = require('express');
var router = express.Router();

var getConnection = require('../config/database');

var authorityCheck = require('../public/javascripts/module/authority')

var password = require('../public/javascripts/module/password')

/* GET home page. */
router.post('/login', function (req, res, next) {
    var body = req.body;
    var id = body.id;
    var pw = body.pw;

    password.comparePWwithHASH(id, pw, (err, result) => {
        if(err) {
            console.log('[ERROR] login has problem\n' + err);
            res.render('index')
        }
        else {
            if(result == 'positive') {
                authorityCheck(id, 'AC001', function(result) {
                    if(result == 'true') {
                        console.log('\x1b[33m%s\x1b[0m', '[INFO] user login success! USER: ' + id); 
                
                        //create session
                        req.session.user = {
                            id: id,
                            authorized: true
                        }
    
                        res.redirect('/main');  
                    }
                    else {
                        console.log('\x1b[33m%s\x1b[0m', '[INFO] user login failed.. USER: ' + id + ' has not enogh authority');
                        res.render('authorityError_login')
                    }
                })
            }
        }
    });
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
