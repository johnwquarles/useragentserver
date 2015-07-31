var request = require('request');
var USERAGENTAPISTART = "http://www.useragentstring.com/?uas=";
var USERAGENTAPIEND = "&getJSON=all";

module.exports = function(userAgentString, cb) {
  request.get(USERAGENTAPISTART + userAgentString + USERAGENTAPIEND, function(err, xhr, body) {
    browser = JSON.parse(body)['agent_name'].toLowerCase();
    version = JSON.parse(body)['agent_version'].split('.')[0];
    //browser = "ie"; version = "9";
    // now that we've got the browser and version, start scraping caniuse for the info we need.
    cb(browser, version);
  });
}
