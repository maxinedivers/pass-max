# fs-tree-traverse
Traverse the contents of a directory and return a list of all files contained within

## Installation

```
npm install fs-tree-traverse
```

## Usage

Basic usage:

```javascript
var traverse = require('fs-tree-traverse');
traverse.list(__dirname, function (err, files) {
    console.log(files);
});

/* Outputs (at time of writing):

[ '/home/lmartin/dev/fs-tree-traverse/LICENSE',
  '/home/lmartin/dev/fs-tree-traverse/README.md',
  '/home/lmartin/dev/fs-tree-traverse/index.js',
  '/home/lmartin/dev/fs-tree-traverse/lib/fs-tree-traverse.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/LICENSE',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/README.md',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/fs.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/graceful-fs.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/package.json',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/polyfills.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/test/max-open.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/test/open.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/test/readdir-sort.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/graceful-fs/test/write-then-read.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/q/LICENSE',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/q/README.md',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/q/package.json',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/q/q.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/q/queue.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/underscore/LICENSE',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/underscore/README.md',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/underscore/package.json',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/underscore/underscore-min.js',
  '/home/lmartin/dev/fs-tree-traverse/node_modules/underscore/underscore.js',
  '/home/lmartin/dev/fs-tree-traverse/package.json' ]

*/
```

## Options

Include hidden files/folders:

```javascript
var traverse = require('fs-tree-traverse');
traverse.list(__dirname, { hidden: true }, function (err, files) {
    console.log(files);
});
```

Output paths relative to directory:

```javascript
var traverse = require('fs-tree-traverse');
traverse.list(__dirname, { relative: true }, function (err, files) {
    console.log(files);
});
/*
=>
[ 'LICENSE',
  'README.md',
  'index.js',
  ... ]
```

## Synchronous alternative

A synchronous alternative to `list` also exists - `listSync` which uses `*Sync` fs methods.

```javascript
var traverse = require('fs-tree-traverse');
var files = traverse.listSync(__dirname);
console.log(files);

/* Outputs (at time of writing):

[ '/home/lmartin/dev/fs-tree-traverse/LICENSE',
  '/home/lmartin/dev/fs-tree-traverse/README.md',
  '/home/lmartin/dev/fs-tree-traverse/index.js',
  ... ]
*/
```
