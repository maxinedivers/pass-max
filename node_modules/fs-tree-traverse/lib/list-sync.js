var fs = require('graceful-fs'),
    path = require('path');

var flatten = require('./flatten');

module.exports = function (root, options) {

    if (arguments.length === 2 && typeof options === 'function') {
        callback = options;
    }

    options = options || {};

    function list(dir) {
        var files = fs.readdirSync(dir);
        return files.map(function (f) {
            return type(path.join(dir, f));
        });
    }

    function type(file) {
        if (!options.hidden && path.basename(file).charAt(0) === '.') {
            return;
        }
        var stat = fs.statSync(file);
        if (stat.isFile()) {
            return file;
        } else if (stat.isDirectory()) {
            return list(file);
        }
    }

    return flatten(list(root), root, options);

};