const express = require('express');
const bodyParser = require('body-parser');
global.Promise = require('bluebird');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.end('hello');
});

module.exports = app;
