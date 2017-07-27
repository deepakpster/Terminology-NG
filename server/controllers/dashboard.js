var express = require('express'),
    mongoose = require('mongoose'),
    Terminology = require('./../models/terminology'),
    Mapper = require('./../models/mapper'),
    fs = require('fs'),
    router = express.Router(),
    sess;

router.get('/codelist-list', function(req, res) {
    var pageNo = req.param('page', 1);
    var clKey = req.param('clkey', 1);
    var SDTM = Terminology(clKey);
    SDTM.findPaginated({
        $where: function() {
            return !this.clcode;
        }
    }, function(err, result) {
        if (err) throw err;
        res.send(result);
    }, 10, pageNo); // pagination options go here
});

router.get('/ct-list', function(req, res) {
    var pageNo = req.param('page', 1);
    var mapper = mongoose.model('mappers', Mapper.schema);
    mapper.findPaginated({}, function(err, result) {
        if (err) throw err;
        res.json(result);
    }, 10, pageNo); // pagination options go here
});

router.get('/codeterm-list', function(req, res) {
    var pageNo = req.param('page', 1);
    var clcode = req.param('code');
    var SDTM = Terminology('SDTM_Terminology_2016-09-30');
    SDTM.findPaginated({
        clcode: clcode
    }, function(err, result) {
        if (err) throw err;
        res.json(result);
    }, 10, pageNo); // pagination options go here
});

module.exports = router;