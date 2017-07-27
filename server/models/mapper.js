var mongoose = require('mongoose');
var mongoosePages = require('mongoose-pages');
var MapperSchema = new mongoose.Schema({
    name: String,
    type: Number,
    group: String,
    updatedon: { type: Date},
    createdon: { type: Date},
    total: Number,
    key: String
});
mongoosePages.skip(MapperSchema);
var Mapper = mongoose.model('Mapper', MapperSchema);

module.exports = Mapper;