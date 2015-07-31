var request = require('request');
var path = require('path');
var parseSupported = require(path.join(process.cwd(), "/lib/parseSupportedOrNot"));

module.exports = function(browser, version, cb) {
  var supported;
  var whetherOrNot;
  request.get('http://caniuse.com/flexbox', function(err, xhr, body) {
    supported = parseSupported(body, browser, version);
    whetherOrNot = supported ? "": "not ";
    cb("Your browser does " + whetherOrNot + "support flexbox.");
  });
}
