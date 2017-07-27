var mongoose = require('mongoose');
var mongoosePages = require('mongoose-pages');
var terminologySchema = new mongoose.Schema({
    code: String,
    clcode: String,
    clext: String,
    definition: String,
    nciterm: String,
    subval: String,
    clname: String
});
mongoosePages.skip(terminologySchema);

module.exports = function(model){
    var Terminology = mongoose.model(model, terminologySchema, model);
    return Terminology;
};