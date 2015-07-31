var http = require('http');
var request = require('request');
var USERAGENTAPISTART = "http://www.useragentstring.com/?uas=";
var USERAGENTAPIEND = "&getJSON=all";

module.exports = function (port) {
  http.createServer(function(req, res) {
    var userAgentString = req.headers['user-agent'];
    request.get(USERAGENTAPISTART + userAgentString + USERAGENTAPIEND, function(err, xhr, body) {
      res.end(body);
    });
  }).listen(port);
}
