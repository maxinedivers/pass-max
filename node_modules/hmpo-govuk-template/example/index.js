var express = require('express');

var app = express();

require('hmpo-govuk-template').setup(app);

app.engine('html', require('hogan-express'));
app.set('view engine', 'html'); // Use .html extensions
app.set('views', __dirname + '/views');

app.get('*', function (req, res) {
    res.render('index');
});

app.listen(3000);