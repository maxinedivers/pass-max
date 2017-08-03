var Hogan = require('hogan.js'),
    fs = require('fs'),
    util = require('util'),
    path = require('path'),
    govukConfig = require('./config'),
    compiledTemplate,
    govukTemplate;

var template = require.resolve('govuk_template_mustache/views/layouts/govuk_template.html');

govukTemplate = fs.readFileSync(template, { encoding : 'utf-8' });
compiledTemplate = Hogan.compile(govukTemplate);
fs.writeFileSync(path.resolve(__dirname, '../govuk_template.html'), compiledTemplate.render(govukConfig), { encoding : 'utf-8' });
