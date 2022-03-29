var express = require('express');
const getConnection = require('../config/database');
var router = express.Router();

const authorityCheck = require('../public/javascripts/module/authority');


module.exports = router;