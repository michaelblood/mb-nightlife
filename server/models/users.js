const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  _id: String,
  username: String,
  displayName: String,
  avatar: String,
});

module.exports = mongoose.model('Users', schema);
