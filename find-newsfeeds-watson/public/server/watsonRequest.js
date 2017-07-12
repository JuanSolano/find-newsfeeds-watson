/*
  Watson Logic
  Find NewsFeed Watson
  Author: JB
  */
'use strict';

let Conversation = require('watson-developer-cloud/conversation/v1');

/**/
let workspace_id;
let username;
let password;
let apiurl;
let version_date;
let conversation;
let sendMessageToWatson;

/**/
apiurl = 'https://gateway.watsonplatform.net/conversation/api';
workspace_id = '018e1c94-d1ac-4842-8a80-cc988831ec62';
username = '17378256-345f-4dee-97c3-1ce9467a4d90';
password = 'uHEh1cWgogut';
version_date = "2016-07-11";

/* Watson service */
conversation = new Conversation({
  "url": apiurl,
  "username": username,
  "password": password,
  "path": { workspace_id: workspace_id },
  "version_date": version_date
});

/* API */
sendMessageToWatson = (req, res) => {

  let watsonObj = {
    workspace_id: workspace_id,
    context: req.body.context || {},
    input: req.body.input || {}
  }

  //DEBUG
  console.log("sendMessageToWatson: ********************************");
  console.log( watsonObj );

  // Send the objet to Watson server and wait for response
  conversation.message( watsonObj,
    function(err, data) {

      if (err) {
        return res.status(err.code || 500).json(err);
      }
      return res.json( data );
    });
}

module.exports = {
  sendMessageToWatson
}
