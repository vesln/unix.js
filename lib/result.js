
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
 * Expose `Result`.
 */

module.exports = Result;
