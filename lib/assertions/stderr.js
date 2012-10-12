
/**
 * Internal dependencies.
 */

var OutAssertion = require('./out');

/**
 * Assert on stderr.
 *
 * @param {String} expected
 * @constructor
 */

function StderrAssertion(expected) {
  OutAssertion.apply(this, arguments);
  this.name = 'Stderr';
};

/**
 * Inherit from `OutAssertion`.
 */

StderrAssertion.prototype.__proto__ = OutAssertion.prototype;

/**
 * Verify expectation.
 *
 * @param {Result} result
 * @returns {null|Error}
 * @api public
 */

StderrAssertion.prototype.assert = function(result) {
  return this.verify(result, result.stderr);
};

/**
 * Expose `StdoutAssertion`.
 */

module.exports = StderrAssertion;
