var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
//var parseSupported = require(path.join(process.cwd(), "/lib/parseSupportedOrNot"));
var scrapeCanIUse = require(path.join(process.cwd(), "/lib/scrapeCanIUse"));
var USERAGENTAPISTART = "http://www.useragentstring.com/?uas=";
var USERAGENTAPIEND = "&getJSON=all";

module.exports = function (port) {
  http.createServer(function(req, res) {
    var userAgentString = req.headers['user-agent'];
    var browser;
    var version;
    request.get(USERAGENTAPISTART + userAgentString + USERAGENTAPIEND, function(err, xhr, body) {
      browser = JSON.parse(body)['agent_name'].toLowerCase();
      version = JSON.parse(body)['agent_version'].split('.')[0];
      browser = "ie"; version = "9";
      // now that we've got the browser and version, start scraping caniuse for the info we need.
      scrapeCanIUse(browser, version, cb);
      function cb(str) {
        res.end(str);
      }
    });
  }).listen(port);
}
