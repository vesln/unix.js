
/**
 * Assert on stdout.
 *
 * @param {String} text
 * @constructor
 */

function StdoutAssertion(text) {
  this.text = text;
};

/**
 * Verify expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

StdoutAssertion.prototype.assert = function(result) {
  if (result.stdout !== this.text) {
    return new Error('Expected "ls Readme.md" to print "lols" but it printed "lols"');
  }

  return null;
};

/**
 * Expose `StdoutAssertion`.
 */

module.exports = StdoutAssertion;
