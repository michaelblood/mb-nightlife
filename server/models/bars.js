const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: String,
  visitors: [ String ],
});

module.exports = mongoose.model('Bars', schema);
