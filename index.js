const app = require('./server/server.js');

const port = app.get('port');
app.listen(port, () => console.log(`listening on ${port}`));
