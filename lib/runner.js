
/**
 * Internal dependencies.
 */

var Command = require('./command')
  , Assertions = require('./assertions')
  , StdoutAssertion = require('./assertions/stdout')
  , ExitCodeAssertion = require('./assertions/exit-code')

/**
 * Runner.
 *
 * @constructor
 */

function Runner() {
  this.command = null;
  this.assertions = new Assertions;
};

/**
 * Add a main command.
 *
 * @param {String} cmd
 * @returns {Object} `this`
 * @api public
 */

Runner.prototype.run = function(cmd) {
  this.command = new Command(cmd);
  return this;
};

/**
 * Append `StdoutAssertion`.
 *
 * @param {String} expected text
 * @returns {Object} `this`
 * @api public
 */

Runner.prototype.stdout = function(text) {
  this.assertions.push(new StdoutAssertion(text));
  return this;
};

/**
 * Append `ExitCodeAssertion`.
 *
 * @param {Number} expected exit code
 * @returns {Object} `this`
 * @api public
 */

Runner.prototype.code = function(code) {
  this.assertions.push(new ExitCodeAssertion(code));
  return this;
};

/**
 * Execute the command and run the assertions.
 *
 * @param {Function} callback
 * @api public
 */

Runner.prototype.end = function(fn) {
  var self = this;

  this.command.execute(function(result) {
    self.assertions.assert(result, fn);
  });
};

/**
 * Expose `Runner`.
 */

module.exports = Runner;
