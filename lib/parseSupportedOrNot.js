var cheerio = require('cheerio');

module.exports = function(body, browser, version){
  //console.log(browser, version);
  $ = cheerio.load(body);
  return $("h4.browser--" + browser + " + ol")
         .find('li:contains("' + version + '")')
         .attr('title').toLowerCase().indexOf("not supported") === -1;
}
