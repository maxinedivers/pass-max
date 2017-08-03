var i18n = require('../lib/i18n-lookup');

var stubi18n = function (key) {

    var values = {
        'foo.bar.baz': 'FooBarBaz',
        'foo.bar': 'FooBar',
        'foo': 'Foo',
        'foo.with.template': 'Foo{{prop}}'
    };

    return values[key] || key;

};

var stubTemplate = function (string, context) {
    return string.replace(/{{([a-z]*)}}/, function (match, prop) {
        return context[prop];
    });
};

describe('i18n lookup', function () {

    var lookup;

    beforeEach(function () {
        lookup = i18n(stubi18n);
    });

    it('returns null for empty keys', function () {
        expect(lookup()).to.be.null;
        expect(lookup([])).to.be.null;
    });

    it('returns null for non-matching keys', function () {
        expect(lookup('not.a.thing')).to.be.null;
    });

    it('returns the i18n lookup value for a single matching key', function () {
        lookup(['foo']).should.equal('Foo');
    });

    it('returns the first matching i18n lookup multiple matching keys', function () {
        lookup(['foo', 'foo.bar', 'foo.bar.baz']).should.equal('Foo');
    });

    it('renders template parameters with the context passed', function () {
        lookup = i18n(stubi18n, stubTemplate);
        lookup(['foo.with.template', 'foo.bar'], { prop: 'Param' }).should.equal('FooParam');
    });

});