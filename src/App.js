var _ = require('underscore');
var mediator = require('./mediator');
var Page = require('./Page');
var Backbone = require('backbone');

var App = function (options) {
    options = options || {};
    this._name = options.name || 'App';
    this._slug = options.slug || '';
    this._originalSlug = this._slug;
    this._parentCid = 'root';
    this._apps = [];
    this.structure = options.structure;
    this.addPages(options.pages || [], this._parentCid);
};


_.extend(App.prototype, {

    mount: function (slug, app) {
        this._apps.push(app);
        this._originalSlug = slug;
        app._slug = this._slug + '/' + slug;
        app._parentCid = this._cid;
    },

    toString: function () {
        return this._name;
    },

    addPage: function (page, parentCid) {
        page.appName = this._name;
        page.parentCid = (parentCid || this._parentCid);

        var pageModel = this.structure.add(_.omit(page, 'pages'));

        // console.log('main page detected', page.name, this._slug, this._originalSlug);
        if (!pageModel.get('slug')) {
            this._cid = pageModel.cid;
            pageModel.set('slug', this._originalSlug)
        }

        if (_.isArray(page.pages)) {
            this.addPages(page.pages, pageModel.get('cid'));
        }
    },

    addPages: function (pages, parentCid) {
        _.each(pages, function (page) {
            this.addPage(page, parentCid);
        }, this);
    },

    setPageRoute: function (page) {
        var route = this.calulatePageRoute(page);

        // console.log('add page', this._slug, route);
        if (route !== false) {
            route = this._slug + route;
            route = route ? route : '/';
            page.set('route', route);
        }
        mediator.trigger('page:start', page);
    },

    setPagesRoutes: function () {
        this.structure
            .chain()
            .filter(function (page) {
                return this._name === page.get('appName');
            }, this)
            .each(this.setPageRoute, this);
    },

    calulatePageRoute: function (page) {
        var route = false;

        if (page && page.has('slug')) {
            var models = page.getPatch();

            route = _.reduce(models, function (memo, model) {
                var slug = model.get('slug');
                if (slug) {
                    memo = memo + '/' + slug;
                }
                return memo;
            }, '');
        }

        return route;
    },

    startSubApps: function () {
        _(this._apps).invoke('start');
    },

    start: function () {
        // console.log('start ' + this, this);

        this.setPagesRoutes();
        this.startSubApps();

        return this;
    }

});

App.extend = Backbone.Model.extend;

module.exports = App;
