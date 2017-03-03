const controllers = require('./controllers');

module.exports = (app) => {

  app.get('/api/search', (req, res) => {
     
  })

  app.get('/', (req, res) => {
    // landing page
  });

  app.get('/*', (req, res) => {
    res.redirect('/');
  });
}