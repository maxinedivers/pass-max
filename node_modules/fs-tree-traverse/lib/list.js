var Q = require('q'),
    fs = require('graceful-fs'),
    path = require('path');

var flatten = require('./flatten');

module.exports = function (root, options, callback) {

    if (arguments.length === 2 && typeof options === 'function') {
        callback = options;
    }

    options = options || {};

    function list(dir) {
        return Q.nfcall(fs.readdir, dir)
            .then(function (files) {
                return files.map(function (f) {
                    return type(path.join(dir, f));
                });
            })
            .spread(function () {
                return [].slice.call(arguments);
            });
    }

    function type(file) {
        if (!options.hidden && path.basename(file).charAt(0) === '.') {
            return;
        }
        return Q.nfcall(fs.stat, file)
            .then(function (stat) {
                if (stat.isFile()) {
                    return file;
                } else if (stat.isDirectory()) {
                    return list(file);
                }
            });
    }

    list(root).then(function (files) {
        callback(null, flatten(files, root, options));
    }, function (err) {
        callback(err);
    });

};