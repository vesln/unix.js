
/**
 * Collection of assertions.
 *
 * @constructor
 */

function Assertions() {
  this.collection = [];
};

/**
 * Append a new assertion.
 *
 * @param {Object} assertion
 * @api public
 */

Assertions.prototype.push = function(assertion) {
  this.collection.push(assertion);
};

/**
 * Iterate and call `assert` on the whole collection.
 *
 * @param {Result} result of the command
 * @param {Function} callback
 * @api public
 */

Assertions.prototype.assert = function(result, fn) {
  var err = null;

  this.collection.forEach(function(assertion) {
    err = assertion.assert(result);
  });

  fn(err);
};

/**
 * Expose `Assertions`.
 */

module.exports = Assertions;
