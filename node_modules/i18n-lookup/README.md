# i18n-lookup
Utility node module for doing lookups from translation documents

## Install

```
npm install [--save] i18n-lookup
```

## Usage

A lookup function is returned by passing in the translation method as an argument. We normally use [i18next](https://www.npmjs.com/package/i18next).

```javascript
/**
Locale: {
    another: {
        translation: {
            key: 'Text'
        }
    }
}
**/
var t = require('i18next').t;

var lookup = require('i18n-lookup')(t);

var translated = lookup([
    'a.translation.key',
    'another.translation.key'
]);

console.log(translated);
// This will output the first key which has a corresponding translation defined.
// => "Text"
```

Additionally, a template compilation method can be provided for cases where the translated key also includes template syntax.

```javascript
/**
Locale: {
    greeting: 'Hello {{name}}'
}
**/
var t = require('i18next').t,
    Mustache = require('mustache');

var lookup = require('i18n-lookup')(t, Mustache.render);

var translated = lookup([
    'greeting'
], {
    name: 'John'
});

console.log(translated);
// This will output the returned lookup compiled with the provided context
// "Hello John"
```
