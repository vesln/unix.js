
/**
 * Core dependencies.
 */

var exec = require('child_process').exec;

/**
 * Internal dependencies.
 */

var Result = require('./result');

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
  var cmd = this.command;

  exec(cmd, function(err, stdout, stderr) {
    fn(new Result(cmd, err, stdout, stderr));
  });
};

/**
 * Expose `Command`.
 */

module.exports = Command;
