var formidable = require('formidable'),
    path = require('path'), //used for file path
    fs = require('fs-extra'),
    mongoose = require('mongoose'),
    Mapper = require('./mapper'),
    _ = require('underscore'),
    XLSX = require('xlsx');

var to_json = function(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        if (sheetName.toLowerCase() != 'readme') {
            var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        }
    });
    return result;
};

var uploader = function(req, res) {
    var form = new formidable.IncomingForm();
    var formFile;
    var type_map = ["SEND", "SDTM", "ADaM"];
    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/../uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        formFile = file.name;
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        console.log(arguments);
        var fileNameTmp = formFile.substring(formFile.lastIndexOf('.'), -1);
        var wb = XLSX.readFile(path.join(form.uploadDir, formFile));
        var output = JSON.stringify(to_json(wb), 2, 2);
        var conn = mongoose.connection;
        var outputJson = JSON.parse(output);
        var collectionKey = _.keys(outputJson)[0];
        //Collection Mappers
        var group = collectionKey.split(" ")[0];
        var newMapper = new Mapper({
            name: collectionKey,
            key: collectionKey.split(" ").join("_"),
            total: outputJson[collectionKey].length,
            group: group,
            createdon: new Date,
            type: type_map.indexOf(group)
        });
        console.log(collectionKey);
        var mapper = mongoose.model('mappers', Mapper.schema);
        mapper.findPaginated({ key: collectionKey.split(" ").join("_") }, function(err, result) {
            if (err) throw err;
            if (result.documents.length == 0) {
                newMapper.save(function(err, terms) {
                    if (err) return console.error(err);
                });
                conn.collection(collectionKey.split(" ").join("_")).insert(outputJson[collectionKey]);
                res.end(output);
            } else {
                res.end('Terminolgy already exists');
            }
        }, 10, 1);
            // Individual Collection
    });

    // parse the incoming request containing the form data
    form.parse(req);
};
module.exports = function() {
    return {
        upload: uploader
    }
};