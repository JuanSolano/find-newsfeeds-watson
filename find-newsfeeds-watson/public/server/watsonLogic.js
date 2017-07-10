'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let Conversation = require('watson-developer-cloud/conversation/v1');
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

/**
  sendMessageToWatson
  * @param  {Object} watsonDataRequest
  * @param  {Object} req
  * @param  {Object} res
  * @return {Object}
*/
function sendMessageToWatson( watsonDataRequest, req, res ){
  //DEBUG
  //console.log("watsonDataRequest: ********************************");
  //console.log(watsonDataRequest);

  // Send the input to the conversation service
  conversation.message( watsonDataRequest, function(err, data) {

    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json( data );
  })
}

module.exports = app;
