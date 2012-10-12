
/**
 * Subject.
 */

var unix = require('..');

describe('unix', function() {
  describe('when asserting on stdout', function() {
    it('does not return an error when the output matches the expected text', function(done) {
      unix()
      .run('ls ' + __filename)
      .stdout(__filename + '\n')
      .end(function(err) {
        (err === null).should.be.true;
        done();
      });
    });

    it('returns an error if the output does not match the expected text', function(done) {
      unix()
      .run('ls ' + __filename)
      .stdout('Invalid')
      .end(function(err) {
        err.message.should.eq('Expected "ls Readme.md" to print "lols" but it printed "lols"');
        done();
      });
    });
  });

  describe('when asserting on exit code', function() {
    it('does not return an error if the status code matches', function(done) {
      unix()
      .run('ls ' + __filename)
      .code(0)
      .end(function(err) {
        (err === null).should.be.true;
        done();
      });
    });

    it('returns an err if the status code does not match', function(done) {
      unix()
      .run('ls /this-is-invalid')
      .code(0)
      .end(function(err) {
        err.message.should.eq('Expected "ls Readme.md" to exit with "0" but it was "1"');
        done();
      });
    });
  });

  xit('can ignore colors');
  xit('can ignore new lines');
  xit('can assert on stderr');
  xit('supports timeouts');
  xit('supports env vars for a command');
  xit('throws an error if no command is supplied');
});
