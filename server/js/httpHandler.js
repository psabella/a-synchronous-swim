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
    if (req.url === './background.jpg') {
      fs.readFile(module.exports.backgroundImageFile, (err, data) => {
        if (err) {
          res.writeHead(404, headers);
        } else {
          res.writeHead(200, headers);
          res.write(data, 'binary');
        }
        res.end();
      })
    } else if (req.url === '/') {
      res.writeHead(200, headers);
      if (messageQueue) {
        res.end(messageQueue.dequeue());
      } else {
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