const { searchYelp, toggleVisiting, } = require('./controllers');

module.exports = (app) => {
  app.get('/api/search', (req, res) => {
    const { location, offset } = req.body;

    return searchYelp(location, Number(offset))
      .then(bars => res.json({ bars }))
      .catch(err => res.json({ error: err.toString() }));
  });

  app.get('/api/toggle', (req, res) => {
    if (!req.user) {
      return res.json({ error: 'not authenticated' });
    }
    return toggleVisiting(req.body.barId, req.user._id)
      .then(bar => res.json({ bar }))
      .catch(err => res.json({ error: err.toString() }));
  });

  app.get('/auth/twitter');
  app.get('/auth/twitter/callback');
  
  app.get('/', (req, res) => {
    // landing page
    res.status(200).end('landing page');
  });

  app.get('/*', (req, res) => {
    res.redirect('/');
  });
};
