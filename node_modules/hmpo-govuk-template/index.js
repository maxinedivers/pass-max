var path = require('path'),
    servestatic = require('serve-static');

var basedir = path.dirname(require.resolve('govuk_template_mustache/package.json'));

module.exports = {
    setup: function (app, options) {

        options = options || {};
        options.path = options.path || '/govuk-assets';

        app.use(options.path, servestatic(path.join(basedir, './assets'), options));
        app.use(function (req, res, next) {
            res.locals.govukAssetPath = req.baseUrl + options.path + '/';
            res.locals.partials = res.locals.partials || {};
            res.locals.partials['govuk-template'] = path.resolve(__dirname, './govuk_template');
            next();
        });

    },
    assetPath: path.join(basedir, './assets')
};
