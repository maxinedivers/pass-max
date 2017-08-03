var partials = require('../');

var traverse = require('fs-tree-traverse');

describe('partial-templates', function () {

    var app, req, res, next,
        files = [
            '/usr/test/layout.html',
            '/usr/test/partials/a.html',
            '/usr/test/partials/b.html',
            '/usr/test/partials/image.jpeg'
        ];

    beforeEach(function () {
        app = {
            get: sinon.stub()
        };
        app.get.withArgs('view engine').returns('html');
        app.get.withArgs('views').returns('/usr/test');
        sinon.stub(traverse, 'listSync').returns(files);
    });
    afterEach(function () {
        traverse.listSync.restore();
    });

    it('returns a middleware function', function () {
        partials(app).should.be.a('function');
        partials(app).length.should.equal(3);
    });

    describe('middleware', function () {

        beforeEach(function () {
            res = {
                locals: {}
            };
            next = sinon.stub();
        });

        it('does not overwrite existing partials', function () {
            res.locals.partials = {
                here: 'already'
            };
            partials(app)(req, res, next);
            res.locals.partials.should.eql({
                here: 'already',
                layout: '/usr/test/layout',
                'partials-a': '/usr/test/partials/a',
                'partials-b': '/usr/test/partials/b'
            });
        });

        it('adds partial templates to res.locals', function () {
            partials(app)(req, res, next);
            res.locals.partials.should.eql({
                layout: '/usr/test/layout',
                'partials-a': '/usr/test/partials/a',
                'partials-b': '/usr/test/partials/b'
            });
        });

        it('allows for an optional prefix', function () {
            partials(app, { prefix: 'foo' })(req, res, next);
            res.locals.partials.should.eql({
                'foo-layout': '/usr/test/layout',
                'foo-partials-a': '/usr/test/partials/a',
                'foo-partials-b': '/usr/test/partials/b'
            });
        });

        describe('multiple view directories', function () {
            var common;

            beforeEach(function () {
                common = [
                    '/usr/common/partials/c.html',
                    '/usr/common/partials/d.html',
                ];
                app.get.withArgs('views').returns(['/usr/test', '/usr/common']);
                traverse.listSync.onCall(0).returns(common);
                traverse.listSync.onCall(1).returns(files);
            });

            it('adds all views to res.partials', function () {
                partials(app)(req, res, next);
                res.locals.partials.should.eql({
                    layout: '/usr/test/layout',
                    'partials-a': '/usr/test/partials/a',
                    'partials-b': '/usr/test/partials/b',
                    'partials-c': '/usr/common/partials/c',
                    'partials-d': '/usr/common/partials/d'
                });
            });

            it('prefers left hand directories if there are duplicate keys', function () {
                traverse.listSync.onCall(0).returns([
                  '/usr/common/partials/a.html'
                ]);
                partials(app)(req, res, next);
                res.locals.partials.should.eql({
                  layout: '/usr/test/layout',
                  'partials-a': '/usr/test/partials/a',
                  'partials-b': '/usr/test/partials/b'
                });
            });
        });

    });

});
