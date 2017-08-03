var fs = require('fs-tree-traverse'),
    _ = require('underscore'),
    path = require('path');

module.exports = function (roots, ext, prefix) {

    ext = ext || '.html';
    prefix = prefix || '';

    if (prefix && prefix.substr(-1) !== '-') {
        prefix += '-';
    }

    var regexp = new RegExp(ext + '$');

    var response = {};

    if (!Array.isArray(roots)) {
        roots = [roots];
    }

    return roots.reduceRight(function (obj, root) {
      var files = fs.listSync(root),
        result = {};

      _.chain(files)
          .filter(function (file) { return file.match(regexp); })
          .map(function (file) { return file.replace(regexp, ''); })
          .each(function (file) {
              var name = path.relative(root, file).split(path.sep).join('-');
              result[prefix + name] = file;
          });
      return _.extend({}, obj, result);
    }, {});
};
