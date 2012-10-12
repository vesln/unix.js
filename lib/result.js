
/**
 * Strip the last new line.
 *
 * @param {String} text
 * @returns {String} text
 */

function strip(text) {
  return text.replace(/\n$/, '');
};

/**
 * Command result.
 *
 * @param {String} command
 * @param {Object} error
 * @param {String} stdout
 * @param {String} stderr
 * @constructor
 */

function Result(cmd, err, stdout, stderr) {
  this.cmd = cmd;
  this.err = err;
  this.stdout = strip(stdout);
  this.stderr = strip(stderr);
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
 * Expose `Result`.
 */

module.exports = Result;
