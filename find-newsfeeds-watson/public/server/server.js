/*
  Twitter
  Find NewsFeed Watson
  Author: JB
  */
  
'use strict';

require('dotenv').config({silent: true});

var server = require('./watsonLogic');
var port = process.env.PORT || process.env.VCAP_APP_PORT || 8000;

server.listen(port, function() {
  // eslint-disable-next-line
  console.log('Server ready : port: %d', port);
});
