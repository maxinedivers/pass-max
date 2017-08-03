var _ = require('underscore'),
    path = require('path');

module.exports = function (files, root, options) {
    return _.chain(files)
        .flatten()
        .filter(_.identity)
        .map(function (p) {
            return options.relative ? path.relative(root, p) : p;
        })
        .value();
};
