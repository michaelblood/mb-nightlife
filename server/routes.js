const path = require('path');

const { searchYelp, toggleVisiting, } = require('./controllers');

module.exports = (app, passport) => {
  app.get('/api/search', (req, res) => {
    const { location, offset } = req.query;

    return searchYelp(location, Number(offset || 0))
      .then(bars => res.json({ bars }))
      .catch(err => res.json({ error: err }));
  });

  app.post('/api/toggle', (req, res) => {
    if (!req.user) {
      return res.json({ error: 'not authenticated' });
    }
    return toggleVisiting(req.body.barId, req.user._id)
      .then(bar => res.json({ bar }))
      .catch(err => res.json({ error: err.toString() }));
  });

  app.get('/api/is-logged-in', (req, res) => {
    if (!req.user) {
      return res.json({ user: null });
    }
    return res.json({ user: req.user });
  });

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
  }));
  app.get('/auth/twitter', passport.authenticate('twitter'));
  
  app.get('*', (req, res) => {
    // landing page
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });
};
