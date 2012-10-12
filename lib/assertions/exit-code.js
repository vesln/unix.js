
/**
 * Assert on exit code.
 *
 * @param {Number} status code
 * @constructor
 */

function ExitCodeAssertion(code) {
  this.code = code;
};

/**
 * Verify the exit code expectations.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

ExitCodeAssertion.prototype.assert = function(result) {
  if (this.code !== result.code()) {
    return new Error('Expected "ls Readme.md" to exit with "0" but it was "1"');
  }

  return null;
};

/**
 * Expose `ExitCodeAssertion`.
 */

module.exports = ExitCodeAssertion;
