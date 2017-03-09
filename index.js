const app = require('./server/server.js');
const mongoose = require('mongoose');
global.Promise = require('bluebird');

mongoose.Promise = global.Promise;
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
};
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nightlife';

mongoose.connect(uri, options);
mongoose.connection.on('error', () => {
  console.log('connection to mongodb failed');
  process.exit(1);
});

const port = app.get('port');
app.listen(port, () => console.log(`listening on ${port}`));
