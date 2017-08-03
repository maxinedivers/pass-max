# hmpo-govuk-template

Compiles govuk mustache template into a more usable format and provide middleware for use in apps.

Existing [govuk mustache template](https://www.npmjs.com/package/govuk_template_mustache) has simple mustache placeholders for content sections, which necessitates a two step compile process where sections are compiled individually and then again into the parent template.

Compiling the template to replace these placeholders with variables allows for templates to implement the govuk template as a parent partial.

## Example

```
{{< govuk-template}}

    {{$main}}
        <h1>Page Content</h1>
    {{/main}}

{{/ govuk-template}}
```

## Installation

```
npm install [--save] hmpo-govuk-template
```

## Usage

The compilation of the template is performed automatically as an npm postinstall hook.

When used as part of an express app, a setup method is provided which will add a static-middleware (using [serve-static](https://www.npmjs.com/package/serve-static)) to serve the template assets without needing to copy them to any other location.

It will also add the template as a mustache partial with a name of "govuk-template".

### To configure express middleware
```
require('hmpo-govuk-template').setup(app[, { ... options ...}]);
```

### To use the mustache partial
```
{{< govuk-template}}
    {{$pageTitle}}An example page{{/pageTitle}}
    {{$main}}
        <h1>Page Content</h1>
    {{/main}}
{{/ govuk-template}}
```

## Options

A number of options can be passed with the app into the setup method:

* `path` - Sets the base path for the location of static assets - Default: `/govuk-assets`

Other options are passed onto the [serve-static](https://www.npmjs.com/package/serve-static) configuration, and more details can be found in [the serve-static documentation](https://www.npmjs.com/package/serve-static)

## Example

There is an example implmentation in '/example'. To run:

```
cd example
npm install
npm start
```