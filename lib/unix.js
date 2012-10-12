
/**
 * Core dependencies.
 */

var exec = require('child_process').exec;

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
 * Executes a command.
 *
 * @parma {Function} callback
 * @api public
 */

Command.prototype.execute = function(fn) {
  exec(this.command, function(err, stdout, stderr) {
    fn(stdout);
  });
};

/**
 * Assert on stdout.
 *
 * @param {String} text
 * @constructor
 */

function OutputAssertion(text) {
  this.text = text;
};

/**
 * Verify expectation.
 *
 * @param {String} stdout
 * @api public
 */

OutputAssertion.prototype.assert = function(stdout) {
  if (stdout !== this.text) {
    return new Error('Expected "ls Readme.md" to print "lols" but it printed "lols"');
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
 * @param {String} stdout
 * @param {Function} callback
 * @api public
 */

Assertions.prototype.assert = function(stdout, fn) {
  var err = null;

  this.collection.forEach(function(assertion) {
    err = assertion.assert(stdout);
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
 * Append an `OutputAssertion`.
 *
 * @param {String} expected text
 * @returns {Object} `this`
 * @api public
 */

Runner.prototype.prints = function(text) {
  this.assertions.push(new OutputAssertion(text));
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

  this.command.execute(function(stdout) {
    self.assertions.assert(stdout, fn);
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
