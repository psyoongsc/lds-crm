var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/main', function(req, res, next) {
  if(req.session.user) {
    console.log('[INFO] successfully accessed main page. USER: ' + req.session.user.id);
    res.render('main', {id: req.session.user.id, name: req.session.user.name});
  }
  else {
    console.log('[ERROR] not permitted access(login)');
    res.redirect('/')
  }
})

module.exports = router;
