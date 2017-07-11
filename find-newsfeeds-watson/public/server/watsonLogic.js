/*
  WatsonLogic
  Find NewsFeed Watson
  Author: JB
  */

'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let Conversation = require('watson-developer-cloud/conversation/v1');
var Twitter = require('twitter');
//
let workspace_id = '018e1c94-d1ac-4842-8a80-cc988831ec62';
let username = '17378256-345f-4dee-97c3-1ce9467a4d90';
let password = 'uHEh1cWgogut';
let apiurl = 'https://gateway.watsonplatform.net/conversation/api';
let app = express();

// Create the service
/*
  TODO:
  fix the version_date to be dynamic
*/
var conversation = new Conversation({
  "url": apiurl,
  "username": username,
  "password": password,
  "path": { workspace_id: workspace_id },
  "version_date": '2016-07-11'
});

// Create the service
/*
  TODO:
  Separate this logic
*/
var twClient = new Twitter({
  consumer_key: 'LzWi15n0eDDxeC1YiT3hSjIAR',
  consumer_secret: 's7G56660y4CYQNCjwOMrbQiQpjbsyGiY3gh23AM4B375i37vcu',
  access_token_key: '76488191-HEuovX0ERd4NW4K3kPLvAsVA7P344j6pVnkFRayIy',
  access_token_secret: 'MaqBBjWedhI5BlLTEQZiZk8ViPkHaoN9wryOlNxkNjPXX'
});

/*
  TODO:
  Use node cors
*/
// Allow crossdomain request
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static('./')); //http://localhost:8000/
app.use(bodyParser.json());

// Message Endpoint
app.post('/api/message/', function(req, res) {

  var watsonDataRequest = {
    workspace_id: workspace_id,
    context: req.body.context || {},
    input: req.body.input || {}
  };
  //
  sendMessageToWatson( watsonDataRequest, req, res );
});

// Twitter Endpoint
app.post('/api/tweets/', function(req, res) {

  /*
  TODO:
  Check if user search params was received
  */

  //
  twClient.get('search/tweets', {q: req.body.search }, function(error, tweets, response) {

    if (error) {
      return res.status(error.code || 500).json(error);
    }
    return res.json( tweets );
  });
});

/**
  sendMessageToWatson
  * @param  {Object} watsonDataRequest
  * @param  {Object} req
  * @param  {Object} res
  * @return {Object}
*/
function sendMessageToWatson( watsonDataRequest, req, res ){
  //DEBUG
  // console.log("watsonDataRequest: ********************************");
  // console.log(watsonDataRequest);

  // Send the input to the conversation service
  conversation.message( watsonDataRequest, function(err, data) {

    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json( data );
  })
}

module.exports = app;
