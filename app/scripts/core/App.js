'use strict';

define(function (require) {
    var _ = require('underscore');
    var mediator = require('core/mediator');
    var Backbone = require('backbone');

    var App = function (options) {
        options || (options = {});
        var name = options.name || 'App';
        var pages = [];
        var apps = [];
        var slug;

        this.getApps = function () {
            return apps;
        };

        this.getPages = function () {
            return pages;
        };

        this.getName = function () {
            return name;
        };

        this.getSlug = function () {
            return slug;
        };

        this.setSlug = function (newSlug) {
            slug = newSlug;
        };

        if (options.slug || options.slug === '') {
            this.setSlug(options.slug);
        }
        this.addApps(options.apps);
        this.addPages(options.pages, options.parentPage);
        this.initialize.apply(this);
    };


    _.extend(App.prototype, {

        initialize: function () {
            console.log('init ' + this, this.getPages());
        },

        toString: function () {
            return this.getName();
        },

        addApp: function (app) {
            var apps = this.getApps();
            app.config.slug = this.getSlug() + '/' + app.config.slug;
            apps.push(app);
        },

        addApps: function (apps) {
            _.each(apps, this.addApp, this);
        },

        registerApp: function (app) {
            if(app.parentPage){
                app.config.parentPage = app.parentPage;
            }
            var a = new App(app.config);
            a.start();
        },

        registerApps: function () {
            _.each(this.getApps(), this.registerApp, this);
        },

        addPage: function (page, parentName) {
            var pages = this.getPages();
            page.parentName = parentName;
            page.appName = this.getName();

            pages.push(page);

            if (_.isArray(page.pages)) {
                this.addPages(page.pages, page.name);
            }
        },

        addPages: function (pages, parentName) {
            _.each(pages, function (page) {
                this.addPage(page, parentName);
            }, this);
        },

        registerPage: function (page) {
            page.route = '/' + this.getSlug() + this.calulatePageRoute(page.name, '');
            mediator.trigger('page:register', page);
        },

        registerPages: function () {
            _.each(this.getPages(), this.registerPage, this);
        },

        calulatePageRoute: function (name, route) {
            var page = this.findPageByName(name);

            if (page && page.slug) {
                route = page.slug + route;
                route = '/' + route;
            }

            if (page && page.parentName) {
                return this.calulatePageRoute(page.parentName, route);
            } else {
                return route;
            }
        },

        findPageByName: function (name) {
            var pages = this.getPages();

            var page = _.find(pages, function (page) {
                return page.name === name;
            });

            return page;
        },

        start: function () {
            console.log('start ' + this, this);
            this.registerPages();
            this.registerApps();
            return this;
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
