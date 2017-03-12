const Yelp = require('yelp');

const { YELP_CONSUMER_KEY, YELP_CONSUMER_SECRET, YELP_TOKEN, YELP_TOKEN_SECRET, } = process.env;

const { Bars } = require('./models');

const yelp = new Yelp({
  consumer_key: YELP_CONSUMER_KEY,
  consumer_secret: YELP_CONSUMER_SECRET,
  token: YELP_TOKEN,
  token_secret: YELP_TOKEN_SECRET,
});

const parseBars = (input) => {
  const bars = input.businesses;
  if (!bars) {
    return input;
  }
  const parsed = bars.map(b => ({
    _id: b.id,
    url: b.url,
    name: b.name,
    description: b.snippet_text,
    thumbnail: b.image_url,
    rating: b.rating,
    ratingImg: b.rating_img_url,
    visitors: [],
  }));
  return parsed;
};

const getVisitors = (bars) => {
  const ids = bars.map(bar => bar._id);
  return Bars.find({ _id: { $in: ids } })
    .then((docs) => {
      if (docs.length === 0) {
        return bars;
      }
      docs.forEach((doc) => {
        const i = ids.indexOf(doc._id);
        if (i >= 0) {
          bars[i].visitors = doc.visitors;
        }
      });
      return bars;
    }).catch(console.log);
};

const searchYelp = (location, offset = 0) => {
  if (!location) {
    Promise.reject(new Error('missing parameter: location'));
  }
  const params = { category_filter: 'bars', location, offset };
  return yelp.search(params)
    .then(parseBars)
    .then(getVisitors)
    .then((bars) => {
      if (bars.error) {
        throw new Error(bars.error.id);
      }
      return bars;
    });
};

const toggleVisiting = (barId, userId) => {
  return Bars.findById(barId)
    .then((bar) => {
      if (!bar) {
        return Bars.create({
          _id: barId,
          visitors: [ userId ]
        });
      }
      const index = bar.visitors.indexOf(userId);
      if (index < 0) {
        bar.visitors.push(userId);
        return bar.save();
      }
      bar.visitors = bar.visitors.splice(index, 0);
      return bar.save();
    });
};

module.exports = {
  searchYelp,
  toggleVisiting,
};
