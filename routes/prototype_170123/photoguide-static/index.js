var app = require('express')();

app.get('/photorules', function (req, res, next) {
	res.render('prototype_170123/photoguide-static/photorules');
});

module.exports = app;
