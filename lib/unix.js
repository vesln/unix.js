
/**
 * Internal dependencies.
 */

var Runner = require('./runner');

/**
 * Return a new `Runner`.
 *
 * @returns {Object}
 */

function unix() {
  return new Runner();
};

/**
 * Expose `unix`.
 */

module.exports = unix;
