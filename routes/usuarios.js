var fs = require('fs');
var allow = require('../services/allow');
var utils = require('../services/utils');
var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');
var multer = require('multer');
var toTitleCase = require('to-title-case');
var Promise = require('bluebird');

var upload = multer({
	dest: 'temp/'
});

var csv = require("fast-csv");



router.get('/hola', function(req, res) {

});




module.exports = router;
