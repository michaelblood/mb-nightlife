const Yelp = require('yelp');
const assert = require('assert');
const {
  YELP_CONSUMER_KEY,
  YELP_CONSUMER_SECRET,
  YELP_TOKEN,
  YELP_TOKEN_SECRET
} = !!process.env.YELP_CONSUMER_KEY ? process.env : require('./config/config');

const { Businesses, Users } = require('./models');

const yelp = new Yelp({
  consumer_key: YELP_CONSUMER_KEY,
  consumer_secret: YELP_CONSUMER_SECRET,
  token: YELP_TOKEN,
  token_secret: YELP_TOKEN_SECRET,
});


const parseBusinesses = (input) => {
  const businesses = input.businesses;
  let parsed = [];
  if (!businesses) {
    return input;
  }
  businesses.map((b) => {
    let business = {
      _id: b.id,
      visitors: [],
      name: b.name,
      description: b.snippet_text,
      thumbnail: b.image_url,
      rating: b.rating
    }
    parsed.push(business);
  });
  return parsed;
};


const searchYelp = (location, offset = 0) => {
  if (!location) {
    return Promise.reject(new Error('missing parameter: location'));
  }
  const params = { category_filter: 'bars', location, offset };
  return yelp.search(params)
    .then(parseBusinesses)
    .then(businesses => {
      if (businesses.error) {
        throw new Error(businesses.error.id);
      }
      return businesses;
    });
};

module.exports = {
  searchYelp,
};
