var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', function(req, res, next) {
  if(req.session.user) {
    console.log('\x1b[33m%s\x1b[0m', '[INFO] successfully accessed main page. USER: ' + req.session.user.id);
    res.render('main', {id: req.session.user.id});
  }
  else {
    console.log('\x1b[36m%s\x1b[0m', '[WARN] not permitted access(login)');
    res.redirect('/')
  }
})

module.exports = router;
