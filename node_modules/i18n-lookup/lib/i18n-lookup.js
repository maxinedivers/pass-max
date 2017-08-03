'use strict';

var _ = require('underscore');

// It should be given:
// - t: a function that will translate a key into the correct language depending
//      on the locale selected.
// - compiler: a function which will compile the string using the context provided
module.exports = function (t, compiler) {

    compiler = compiler || _.identity;

    /**
     * Given an array of keys and a context iterate through
     * each of the keys until (1) the translated key is different
     * from the non-translated key, and (2) a template containing the
     * data from the context compiles successfully.
     */
    return function (keys, context) {
        if (typeof keys === 'string') {
            keys = [keys];
        }

        return _.reduce(keys, function (message, token) {
            if (!message && t(token) !== token) {
                try {
                    message = compiler(t(token), context || {});
                } catch (e) {}
            }
            return message;
        }, null);

    };
};
