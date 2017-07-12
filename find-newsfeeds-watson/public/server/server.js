/*
  Nodejs server
  Find NewsFeed Watson
  Author: JB
  */

/*
server ( express )

dotenv
PORT=8000 node server
*/
'use strict';

require('dotenv').config({
  silent: true
});

const server = require('./serverLogic');
const defaultPort = 8000;
const port = process.env.PORT || defaultPort;

server.listen(port, function() {

  console.log('Server ready : port: %d', port);
});
