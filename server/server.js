const express = require('express');
const bodyParser = require('body-parser');
global.Promise = require('bluebird');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.end('hello');
})

module.exports = app;
