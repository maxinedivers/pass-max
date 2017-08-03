'use strict';

var _ = require('underscore'),
    traverse = require('./lib/traverse');

var Parser = function (app, options) {

    options = options || {};

    var ext = '.' + app.get('view engine'),
        partials = traverse(app.get('views'), ext, options.prefix);

    return function (req, res, next) {
        res.locals.partials = res.locals.partials || {};
        _.extend(res.locals.partials, partials);
        next();
    };
};

module.exports = Parser;
