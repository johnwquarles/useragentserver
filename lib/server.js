var http = require('http');
var path = require('path');
var getUserAgent = require(path.join(process.cwd(), "/lib/getUserAgent"));
var scrapeCanIUse = require(path.join(process.cwd(), "/lib/scrapeCanIUse"));

module.exports = function (port) {
  http.createServer(function(req, res) {
    var userAgentString = req.headers['user-agent'];
    getUserAgent(userAgentString, cb1);
    function cb1(browser, version) {
      scrapeCanIUse(browser, version, cb2);
    }
    function cb2(str) {
      res.end(str);
    }
  }).listen(port);
}
