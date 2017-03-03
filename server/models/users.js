const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  loginMethod: String,
  _id: String,
  username: String,
  displayName: String,
  avatar: String,
  state: String
});

module.exports = mongoose.model('Users', schema);
