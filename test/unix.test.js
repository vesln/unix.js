
/**
 * Subject.
 */

var unix = require('..');

describe('unix', function() {
  it('can assert output', function(done) {
    unix()
      .run('ls Readme.md')
      .prints('Readme.md\n')
      .end(function(err) {
        (err === null).should.be.true;
        done();
      });
  });

  it('returns an error if the output is not correct', function(done) {
    unix()
      .run('ls Readme.md')
      .prints('lols')
      .end(function(err) {
        err.message.should.eq('Expected "ls Readme.md" to print "lols" but it printed "lols"');
        done();
      });
  });

  xit('can ignore colors');
  xit('can ignore new lines');
  xit('can assert on status code');
  xit('can assert on stderr');
  xit('can assert on execution time');
  xit('supports timeouts');
  xit('supports env vars for a command');
  xit('throws an error if no command is supplied');
});
