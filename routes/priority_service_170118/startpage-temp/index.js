var app = require('express')(),
    wizard = require('hmpo-form-wizard'),
    steps = require('./steps'),
    fields = require('./fields');

app.use(require('hmpo-template-mixins')(fields, { sharedTranslationKey: 'prototype' }));

app.use(wizard(steps, fields, { templatePath: 'priority_service_170118/startpage-temp' }));

module.exports = app;
