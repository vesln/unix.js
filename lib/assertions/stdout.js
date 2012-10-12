
/**
 * Internal dependencies.
 */

var OutAssertion = require('./out');

/**
 * Assert on stdout.
 *
 * @param {String} expected
 * @constructor
 */

function StdoutAssertion(expected) {
  OutAssertion.apply(this, arguments);
  this.name = 'Stdout';
};

/**
 * Inherit from `OutAssertion`.
 */

StdoutAssertion.prototype.__proto__ = OutAssertion.prototype;

/**
 * Verify expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

StdoutAssertion.prototype.assert = function(result) {
  return this.verify(result, result.stdout);
};

/**
 * Expose `StdoutAssertion`.
 */

module.exports = StdoutAssertion;
