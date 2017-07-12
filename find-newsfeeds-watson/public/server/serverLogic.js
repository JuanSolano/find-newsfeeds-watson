/*
  Server logic
  Find NewsFeed Watson
  Author: JB
  */
'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let twitterRequest = require('./twitterRequest');
let watsonRequest = require('./watsonRequest');

/**/
let app;
let serverPath;

/**/
app = express();
serverPath = express.static( __dirname + '/' );

/**/
/*
  TODO:
  Use node cors
*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(serverPath);
app.use(bodyParser.json());

// Watson Endpoint
app.post('/api/watson/', function(req, res) {

  watsonRequest.sendMessageToWatson(req, res);
});

// Twitter Endpoint
app.post('/api/tweets/', function(req, res) {

  twitterRequest.searchOnTwitter(req, res);
});

module.exports = app;
