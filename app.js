var express = require('express');
    app = express(),
    path = require('path'),
    redis = require('./lib/redis-client'),
    _ = require('lodash');

// check for Redis session store
var session = require('express-session'),
    RedisStore = require('connect-redis')(session),
    sessionConfig = {
        secret: 'abc123',
        resave: true,
        saveUninitialized: true
    };

redis.getClient(function (err, client) {
    if (err) {
        return init();
    }
    init({
        store: new RedisStore({
            client: client,
            ttl: 60 * 30
        })
    });
});

function init(sessionStore) {
    // auth
    if (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'heroku') {
        var auth = require('express-basic-auth');
       function authoriser(user, pass) {
            return (user === process.env.USER || user === 'fish') && (pass === process.env.PASS || pass === process.env.PASSWORD || pass === 'chips');
        };
        app.use(auth({
            authorizer: authoriser,
            challenge: true
        }));
    }

    // session
    app.use(require('cookie-parser')());
    app.use(session(_.extend(sessionConfig, sessionStore)));

    app.use(require('i18n-future').middleware());
    app.use(require('body-parser').urlencoded({ extended: true }));

    // templates
    app.set('view engine', 'html');
    app.use(require('hmpo-templates'));
    app.engine('html', require('hogan-express-strict'));
    app.use(require('express-partial-templates')(app));
    app.use(require('hmpo-template-mixins')());
    app.use('/public/images', express.static('assets/images'));
    app.use('/public/images', express.static(path.resolve(path.dirname(require.resolve('hmpo-frontend-toolkit')), 'assets/images')));
    app.use('/public', express.static('public'));
    app.use(function (req, res, next) {
        res.locals.assetPath = '/public';
        res.locals.urls = {
            feedback: ' '
        };
        next();
    });

    //create static folder for email templates etc
    app.use('/static', express.static(path.join(__dirname, '/static')));

    // prototype views
    // app.set('views', __dirname + '/views/prototype_161025');

    // routes
    app.use(require('./routes/start'));
    app.use('/prototype_161025/static', require('./routes/prototype_161025/static'));
    app.use('/prototype_161025/forms', require('./routes/prototype_161025/forms'));
    app.use('/prototype_161025/sar', require('./routes/prototype_161025/sar'));
    app.use('/prototype_161025/overseas', require('./routes/prototype_161025/overseas'));
    app.use('/prototype_161025/uploadphoto', require('./routes/prototype_161025/uploadphoto'));
    app.use('/prototype_161025/photoguide-myself', require('./routes/prototype_161025/photoguide-myself'));
    app.use('/prototype_161025/renew', require('./routes/prototype_161025/renew'));
    app.use('/prototype_161025/intro', require('./routes/prototype_161025/intro'));
    app.use('/prototype_161025/filter', require('./routes/prototype_161025/filter'));
    app.use('/prototype_161025/startpage', require('./routes/prototype_161025/startpage'));
    app.use('/prototype_161025/renew', require('./routes/prototype_161025/renew'));



//prototype OIX 170601
                    app.use('/prototype_oix_170601/uploadphoto', require('./routes/prototype_oix_170601/uploadphoto'));
                    app.use('/prototype_oix_170601/filter-common', require('./routes/prototype_oix_170601/filter-common'));
                    app.use('/prototype_oix_170601/renew', require('./routes/prototype_oix_170601/renew'));
                    app.use('/prototype_oix_170601/intro', require('./routes/prototype_oix_170601/intro'));
                    app.use('/prototype_oix_170601/filter', require('./routes/prototype_oix_170601/filter'));
                    app.use('/prototype_oix_170601/startpage', require('./routes/prototype_oix_170601/startpage'));
                    app.use('/prototype_oix_170601/photoguide-short', require('./routes/prototype_oix_170601/photoguide-short'));
                    app.use('/prototype_oix_170601/photoguide-static', require('./routes/prototype_oix_170601/photoguide-static'));
                    app.use('/prototype_oix_170601/photoguide-shop', require('./routes/prototype_oix_170601/photoguide-shop'));
                    app.use('/prototype_oix_170601/takephoto', require('./routes/prototype_oix_170601/takephoto'));
                    app.use('/prototype_oix_170601/upload', require('./routes/prototype_oix_170601/upload'));
                    app.use('/prototype_oix_170601/rejectedphoto', require('./routes/prototype_oix_170601/rejectedphoto'));
                    app.use('/prototype_oix_170601/throttle', require('./routes/prototype_oix_170601/throttle'));
                    app.use('/prototype_oix_170601/payment', require('./routes/prototype_oix_170601/payment'));
                    app.use('/prototype_oix_170601/submission-failed', require('./routes/prototype_oix_170601/submission-failed'));
                    app.use('/prototype_oix_170601/sar', require('./routes/prototype_oix_170601/sar'));
                    app.use('/prototype_oix_170601/photo-url', require('./routes/prototype_oix_170601/photo-url'));
                    app.use('/prototype_oix_170601/photo-code', require('./routes/prototype_oix_170601/photo-code'));
                    app.use('/prototype_oix_170601/oix', require('./routes/prototype_oix_170601/oix'));
                    app.use('/prototype_oix_170601/intro-oix', require('./routes/prototype_oix_170601/intro-oix'));
                    app.use('/prototype_oix_170601/photo-retrieved', require('./routes/prototype_oix_170601/photo-retrieved'));
                    app.use('/prototype_oix_170601/startpage-oix', require('./routes/prototype_oix_170601/startpage-oix'));
                    app.use('/prototype_oix_170601/filter-oix', require('./routes/prototype_oix_170601/filter-oix'));
                    app.use('/prototype_oix_170601/filter-common-oix', require('./routes/prototype_oix_170601/filter-common-oix'));


//prototype OIX 170821
                    app.use('/prototype_oix_170821/uploadphoto', require('./routes/prototype_oix_170821/uploadphoto'));
                    app.use('/prototype_oix_170821/filter-common', require('./routes/prototype_oix_170821/filter-common'));
                    app.use('/prototype_oix_170821/renew', require('./routes/prototype_oix_170821/renew'));
                    app.use('/prototype_oix_170821/intro', require('./routes/prototype_oix_170821/intro'));
                    app.use('/prototype_oix_170821/filter', require('./routes/prototype_oix_170821/filter'));
                    app.use('/prototype_oix_170821/startpage', require('./routes/prototype_oix_170821/startpage'));
                    app.use('/prototype_oix_170821/photoguide-short', require('./routes/prototype_oix_170821/photoguide-short'));
                    app.use('/prototype_oix_170821/photoguide-static', require('./routes/prototype_oix_170821/photoguide-static'));
                    app.use('/prototype_oix_170821/photoguide-shop', require('./routes/prototype_oix_170821/photoguide-shop'));
                    app.use('/prototype_oix_170821/takephoto', require('./routes/prototype_oix_170821/takephoto'));
                    app.use('/prototype_oix_170821/upload', require('./routes/prototype_oix_170821/upload'));
                    app.use('/prototype_oix_170821/rejectedphoto', require('./routes/prototype_oix_170821/rejectedphoto'));
                    app.use('/prototype_oix_170821/throttle', require('./routes/prototype_oix_170821/throttle'));
                    app.use('/prototype_oix_170821/payment', require('./routes/prototype_oix_170821/payment'));
                    app.use('/prototype_oix_170821/submission-failed', require('./routes/prototype_oix_170821/submission-failed'));
                    app.use('/prototype_oix_170821/sar', require('./routes/prototype_oix_170821/sar'));
                    app.use('/prototype_oix_170821/photo-url', require('./routes/prototype_oix_170821/photo-url'));
                    app.use('/prototype_oix_170821/photo-code', require('./routes/prototype_oix_170821/photo-code'));
                    app.use('/prototype_oix_170821/oix', require('./routes/prototype_oix_170821/oix'));
                    app.use('/prototype_oix_170821/intro-oix', require('./routes/prototype_oix_170821/intro-oix'));
                    app.use('/prototype_oix_170821/photo-retrieved', require('./routes/prototype_oix_170821/photo-retrieved'));
                    app.use('/prototype_oix_170821/startpage-oix', require('./routes/prototype_oix_170821/startpage-oix'));
                    app.use('/prototype_oix_170821/filter-oix', require('./routes/prototype_oix_170821/filter-oix'));
                    app.use('/prototype_oix_170821/filter-common-oix', require('./routes/prototype_oix_170821/filter-common-oix'));

//prototype OIX 170906
                    app.use('/prototype_oix_170906/uploadphoto', require('./routes/prototype_oix_170906/uploadphoto'));
                    app.use('/prototype_oix_170906/filter-common', require('./routes/prototype_oix_170906/filter-common'));
                    app.use('/prototype_oix_170906/renew', require('./routes/prototype_oix_170906/renew'));
                    app.use('/prototype_oix_170906/intro', require('./routes/prototype_oix_170906/intro'));
                    app.use('/prototype_oix_170906/filter', require('./routes/prototype_oix_170906/filter'));
                    app.use('/prototype_oix_170906/startpage', require('./routes/prototype_oix_170906/startpage'));
                    app.use('/prototype_oix_170906/photoguide-short', require('./routes/prototype_oix_170906/photoguide-short'));
                    app.use('/prototype_oix_170906/photoguide-static', require('./routes/prototype_oix_170906/photoguide-static'));
                    app.use('/prototype_oix_170906/photoguide-shop', require('./routes/prototype_oix_170906/photoguide-shop'));
                    app.use('/prototype_oix_170906/takephoto', require('./routes/prototype_oix_170906/takephoto'));
                    app.use('/prototype_oix_170906/upload', require('./routes/prototype_oix_170906/upload'));
                    app.use('/prototype_oix_170906/rejectedphoto', require('./routes/prototype_oix_170906/rejectedphoto'));
                    app.use('/prototype_oix_170906/throttle', require('./routes/prototype_oix_170906/throttle'));
                    app.use('/prototype_oix_170906/payment', require('./routes/prototype_oix_170906/payment'));
                    app.use('/prototype_oix_170906/submission-failed', require('./routes/prototype_oix_170906/submission-failed'));
                    app.use('/prototype_oix_170906/sar', require('./routes/prototype_oix_170906/sar'));
                    app.use('/prototype_oix_170906/photo-url', require('./routes/prototype_oix_170906/photo-url'));
                    app.use('/prototype_oix_170906/photo-code', require('./routes/prototype_oix_170906/photo-code'));
                    app.use('/prototype_oix_170906/oix', require('./routes/prototype_oix_170906/oix'));
                    app.use('/prototype_oix_170906/intro-oix', require('./routes/prototype_oix_170906/intro-oix'));
                    app.use('/prototype_oix_170906/photo-retrieved', require('./routes/prototype_oix_170906/photo-retrieved'));
                    app.use('/prototype_oix_170906/startpage-oix', require('./routes/prototype_oix_170906/startpage-oix'));
                    app.use('/prototype_oix_170906/filter-oix', require('./routes/prototype_oix_170906/filter-oix'));
                    app.use('/prototype_oix_170906/filter-common-oix', require('./routes/prototype_oix_170906/filter-common-oix'));

//prototype OIX 171004
                    app.use('/prototype_oix_171004/uploadphoto', require('./routes/prototype_oix_171004/uploadphoto'));
                    app.use('/prototype_oix_171004/filter-common', require('./routes/prototype_oix_171004/filter-common'));
                    app.use('/prototype_oix_171004/renew', require('./routes/prototype_oix_171004/renew'));
                    app.use('/prototype_oix_171004/intro', require('./routes/prototype_oix_171004/intro'));
                    app.use('/prototype_oix_171004/filter', require('./routes/prototype_oix_171004/filter'));
                    app.use('/prototype_oix_171004/startpage', require('./routes/prototype_oix_171004/startpage'));
                    app.use('/prototype_oix_171004/photoguide-short', require('./routes/prototype_oix_171004/photoguide-short'));
                    app.use('/prototype_oix_171004/photoguide-static', require('./routes/prototype_oix_171004/photoguide-static'));
                    app.use('/prototype_oix_171004/photoguide-shop', require('./routes/prototype_oix_171004/photoguide-shop'));
                    app.use('/prototype_oix_171004/takephoto', require('./routes/prototype_oix_171004/takephoto'));
                    app.use('/prototype_oix_171004/upload', require('./routes/prototype_oix_171004/upload'));
                    app.use('/prototype_oix_171004/rejectedphoto', require('./routes/prototype_oix_171004/rejectedphoto'));
                    app.use('/prototype_oix_171004/throttle', require('./routes/prototype_oix_171004/throttle'));
                    app.use('/prototype_oix_171004/payment', require('./routes/prototype_oix_171004/payment'));
                    app.use('/prototype_oix_171004/submission-failed', require('./routes/prototype_oix_171004/submission-failed'));
                    app.use('/prototype_oix_171004/sar', require('./routes/prototype_oix_171004/sar'));
                    app.use('/prototype_oix_171004/photo-url', require('./routes/prototype_oix_171004/photo-url'));
                    app.use('/prototype_oix_171004/photo-code', require('./routes/prototype_oix_171004/photo-code'));
                    app.use('/prototype_oix_171004/oix', require('./routes/prototype_oix_171004/oix'));
                    app.use('/prototype_oix_171004/intro-oix', require('./routes/prototype_oix_171004/intro-oix'));
                    app.use('/prototype_oix_171004/photo-retrieved', require('./routes/prototype_oix_171004/photo-retrieved'));
                    app.use('/prototype_oix_171004/startpage-oix', require('./routes/prototype_oix_171004/startpage-oix'));
                    app.use('/prototype_oix_171004/filter-oix', require('./routes/prototype_oix_171004/filter-oix'));
                    app.use('/prototype_oix_171004/filter-common-oix', require('./routes/prototype_oix_171004/filter-common-oix'));

//prototype OIX 171117
                    app.use('/prototype_oix_171117/uploadphoto', require('./routes/prototype_oix_171117/uploadphoto'));
                    app.use('/prototype_oix_171117/filter-common', require('./routes/prototype_oix_171117/filter-common'));
                    app.use('/prototype_oix_171117/renew', require('./routes/prototype_oix_171117/renew'));
                    app.use('/prototype_oix_171117/intro', require('./routes/prototype_oix_171117/intro'));
                    app.use('/prototype_oix_171117/filter', require('./routes/prototype_oix_171117/filter'));
                    app.use('/prototype_oix_171117/startpage', require('./routes/prototype_oix_171117/startpage'));
                    app.use('/prototype_oix_171117/photoguide-short', require('./routes/prototype_oix_171117/photoguide-short'));
                    app.use('/prototype_oix_171117/photoguide-static', require('./routes/prototype_oix_171117/photoguide-static'));
                    app.use('/prototype_oix_171117/photoguide-shop', require('./routes/prototype_oix_171117/photoguide-shop'));
                    app.use('/prototype_oix_171117/takephoto', require('./routes/prototype_oix_171117/takephoto'));
                    app.use('/prototype_oix_171117/upload', require('./routes/prototype_oix_171117/upload'));
                    app.use('/prototype_oix_171117/rejectedphoto', require('./routes/prototype_oix_171117/rejectedphoto'));
                    app.use('/prototype_oix_171117/throttle', require('./routes/prototype_oix_171117/throttle'));
                    app.use('/prototype_oix_171117/payment', require('./routes/prototype_oix_171117/payment'));
                    app.use('/prototype_oix_171117/submission-failed', require('./routes/prototype_oix_171117/submission-failed'));
                    app.use('/prototype_oix_171117/sar', require('./routes/prototype_oix_171117/sar'));
                    app.use('/prototype_oix_171117/photo-url', require('./routes/prototype_oix_171117/photo-url'));
                    app.use('/prototype_oix_171117/photo-code', require('./routes/prototype_oix_171117/photo-code'));
                    app.use('/prototype_oix_171117/oix', require('./routes/prototype_oix_171117/oix'));
                    app.use('/prototype_oix_171117/intro-oix', require('./routes/prototype_oix_171117/intro-oix'));
                    app.use('/prototype_oix_171117/photo-retrieved', require('./routes/prototype_oix_171117/photo-retrieved'));
                    app.use('/prototype_oix_171117/startpage-oix', require('./routes/prototype_oix_171117/startpage-oix'));
                    app.use('/prototype_oix_171117/filter-oix', require('./routes/prototype_oix_171117/filter-oix'));
                    app.use('/prototype_oix_171117/filter-common-oix', require('./routes/prototype_oix_171117/filter-common-oix'));



app.use('/override', require('./routes/override'));








    var port = process.env.PORT || 3000;
    app.listen(port);
    console.log('App listening on port %s', port);
}
