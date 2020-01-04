const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueued = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // const validMessages = ['left', 'right', 'up', 'down'];
  // var rand = validMessages[Math.floor(Math.random() * validMessages.length)];

  // if background image missing, return 404

  if (req.method === 'GET') {
    if (req.url === this.backgroundImageFile) {
      if (this.backgroundImageFile !== path.join('.', 'background.jpg')) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end();
      }
    } else {
      if (messageQueue) {
        var firstInLine = messageQueue.dequeue();
        res.writeHead(200, headers);
        res.end(firstInLine);
      } else {
        res.writeHead(200, headers);
        res.end();
      }
    }
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!
};