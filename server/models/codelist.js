var mongoose = require('mongoose');  
var codeListSchema = new mongoose.Schema({  
  name: String,
  cid: String,
  type: Number
});
mongoose.model('Codelist', codeListSchema, 'codelist');