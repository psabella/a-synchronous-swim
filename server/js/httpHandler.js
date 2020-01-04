const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  const validMessages = ['left', 'right', 'up', 'down'];
  var rand = validMessages[Math.floor(Math.random() * validMessages.length)];

  res.writeHead(200, headers);
  if (req.method === 'GET') {
    res.end(rand);
  }
  if (req.method === 'OPTIONS') {
    res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!
};