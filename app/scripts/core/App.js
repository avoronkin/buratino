'use strict';

define(function (require) {
    var _ = require('underscore');
    var mediator = require('core/mediator');
    var Backbone = require('backbone');
    var structure = require('models/structure');

    var App = function (options) {
        options || (options = {});
        this._name = options.name || 'App';
        this._slug = options.slug || '';

        this.addPages(options.pages);
        this.initialize.apply(this);
    };


    _.extend(App.prototype, {

        initialize: function () {
            console.log('init ' + this);
        },

        toString: function () {
            return this._name;
        },

        addPage: function (page, parentName) {
            page.appName = this._name;
            page.parentName = (parentName || 'root');

            structure.add(_.omit(page, 'pages'));

            if (_.isArray(page.pages)) {
                this.addPages(page.pages, page.name);
            }
        },

        addPages: function (pages, parentName) {
            _.each(pages, function (page) {
                this.addPage(page, parentName);
            }, this);
        },

        registerPageRoute: function (page) {
            var route = this.calulatePageRoute(page);
            if (route !== false) {
                page.set('route', '/' + this._slug + route);
                mediator.trigger('page:registerRoute', page.toJSON());
            }
        },

        registerPagesRoutes: function () {
            structure
                .chain()
                .filter(function (page) {
                    return this._name === page.get('appName');
                }, this)
                .each(this.registerPageRoute, this);
        },

        calulatePageRoute: function (page) {
            var route = false;

            if (page && page.has('slug')) {
                var models = page.getBreadcrumbs();

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


        start: function () {
            console.log('start ' + this, this);
            this.registerPagesRoutes();
            return this;
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
