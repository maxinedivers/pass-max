var app = require('express')();

app.get('/photorules', function (req, res, next) {
	res.render('prototype_oix_170821/photoguide-static/photorules');
});

module.exports = app;
