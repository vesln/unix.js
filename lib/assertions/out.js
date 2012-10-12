
/**
 * Base out assertion.
 *
 * @param {String} expected
 * @constructor
 */

function OutAssertion(expected) {
  this.expected = expected;
};

/**
 * Verify an expection.
 *
 * @param {Result} result
 * @param {String} actual
 * @api private
 */

OutAssertion.prototype.verify = function(result, actual) {
  if (this.expected !== actual) {
    return new Error(
      this.name + ' from "' + result.cmd + '": Expected "' + this.expected +'" to equal "' + actual +'"'
    );
  }

  return null;
};

/**
 * Expose `OutAssertion`.
 */

module.exports = OutAssertion;
