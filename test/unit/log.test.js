var expect = require('chai').expect;
var chalk = require('chalk');
var path = require('path');

var log = require(path.join(process.cwd(),'/lib/server'));

describe('Server', function() {

  describe('#userAgent()', function() {

    it('should return information about the clients browser', function() {
      var req = {};
      req.headers = { 'user-agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2468.2 Safari/537.36' }
      expect(log.userAgent(req)).to.equal('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2468.2 Safari/537.36');
    });
  });
});
