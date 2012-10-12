
/**
 * Core dependencies.
 */

var exec = require('child_process').exec;

/**
 * Command result.
 *
 * @param {Object} error
 * @param {String} stdout
 * @param {String} stderr
 * @constructor
 */

function Result(err, stdout, stderr) {
  this.err = err;
  this.stdout = stdout;
  this.stderr = stderr;
};

/**
 * Return the exit code from the execution
 * of the command.
 *
 * @returns {Number}
 * @api public
 */

Result.prototype.code = function() {
  return this.err ? this.err.code : 0;
};

/**
 * Command.
 *
 * @param {String} command to be executed
 * @constroctor
 */

function Command(cmd) {
  this.command = cmd;
};

/**
 * Execute a command.
 *
 * @parma {Function} callback
 * @api public
 */

Command.prototype.execute = function(fn) {
  exec(this.command, function(err, stdout, stderr) {
    fn(new Result(err, stdout, stderr));
  });
};

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
