/*
  Twitter Logic
  Find NewsFeed Watson
  Author: JB
  */
'use strict';

let Twitter = require('twitter');

/**/
let twitterClient;
let consumer_key;
let consumer_secret;
let access_token_key;
let access_token_secret;
let searchOnTwitter;

/**/
consumer_key ='LzWi15n0eDDxeC1YiT3hSjIAR',
consumer_secret = 's7G56660y4CYQNCjwOMrbQiQpjbsyGiY3gh23AM4B375i37vcu',
access_token_key = '76488191-HEuovX0ERd4NW4K3kPLvAsVA7P344j6pVnkFRayIy',
access_token_secret = 'MaqBBjWedhI5BlLTEQZiZk8ViPkHaoN9wryOlNxkNjPXX'

/* Twitter service */
twitterClient = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token_key: access_token_key,
  access_token_secret: access_token_secret
});

/* API */
searchOnTwitter = (req, res) => {

  twitterClient.get('search/tweets', {q: req.body.search }, function(error, tweets, response) {

    // DEBUG
    //console.log(tweets);

    if (error) {
      return res.status(error.code || 500).json(error);
    }
    return res.json(tweets);
  });
}

module.exports = {
  searchOnTwitter
}
