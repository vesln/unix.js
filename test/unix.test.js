
/**
 * Subject.
 */

var unix = require('..');

describe('unix', function() {
  describe('when asserting on stdout', function() {
    it('does not return an error when the output matches the expected text', function(done) {
      unix()
      .run('ls ' + __filename)
      .stdout(__filename)
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
        err.message.should.eq(
          'Stdout from "ls ' + __filename +'": Expected "Invalid" to equal "' + __filename + '"'
        );
        done();
      });
    });
  });

  describe('when asserting on stderr', function() {
    it('does not return an error when the output matches the expected text', function(done) {
      unix()
      .run('ls /invalid')
      .stderr('ls: /invalid: No such file or directory')
      .end(function(err) {
        (err === null).should.be.true;
        done();
      });
    });

    it('can match output with regexps', function() {
      unix()
      .run('ls /invalid')
      .stderr(/No such file or directory/)
      .end(function(err) {
        (err === null).should.be.true;
        done();
      });
    });

    it('returns an error if the output does not match the expected text', function(done) {
      unix()
      .run('ls /invalid')
      .stderr('Invalid')
      .end(function(err) {
        err.message.should.eq(
          'Stderr from "ls /invalid": Expected "Invalid" to equal "ls: /invalid: No such file or directory"'
        );
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
  xit('can assert on stderr and stdout with regexps');
  xit('supports timeouts');
  xit('supports env vars for a command');
  xit('supports before & after filters');
  xit('throws an error if no command is supplied');
  xit('custom error that includes all of the failed expectations');
  // assertions -> expectations
});
