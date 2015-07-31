var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
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
      //browser = "ie"; version = "9";
      console.log(browser, version);
      // now that we've got the browser and version, start scraping caniuse for the info we need.

      request.get('http://caniuse.com/flexbox', function(err, xhr, body) {
        $ = cheerio.load(body);
        res.end(($("h4.browser--" + browser + " + ol").find('li:contains("' + version + '")').attr('title').toLowerCase().indexOf("not supported") === -1).toString());
      })
    });
  }).listen(port);
}
