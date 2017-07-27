var formidable = require('formidable'),
    path = require('path'), //used for file path
    fs = require('fs-extra'),
    express = require('express'),
    mongoose = require('mongoose'),
    Mapper = require('./../models/mapper'),
    Upload = require('./../models/upload'),
    _ = require('underscore'),
    XLSX = require('xlsx'),
    router = express.Router();

router.post('/upload', function(req, res) {
    console.log('uploading terminology');
    var uploader = new Upload();
    uploader.upload(req, res);
});
module.exports = router;
