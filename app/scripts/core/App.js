'use strict';

define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var App = function (options) {
        options || (options = {});
        this.mediator = mediator;
        this.name = options.name || 'App';

        if (options.slug || options.slug === '') {
            this.setSlug(options.slug);
        }

        this.addApps(options.apps);
        this.addPages(options.pages);

        this.initialize.apply(this);
    };

    _.extend(App.prototype, {
        initialize: function () {
            console.log('init' + this, this);
        },
        toString: function () {
            return this.name;
        },

        addApp: function (app) {
            this._apps.push(app);
        },
        addApps: function (apps) {
            this._apps || (this._apps = []);
            _.each(apps, function(app){
                app.config.slug = this.getSlug() + '/' + app.config.slug;
                this.addApp(app)
                console.log('addApp',app) 
            }, this);


        },
        getApps: function () {
            return this._apps;
        },
        registerApp: function (app) {

        },
        registerApps: function () {
            _.each(this.getApps(), function(app){
                var a = new App(app.config);
                a.start();
                console.log('start appp')
            }) 
        },

        //Страницы

        getPages: function () {
            return this._pages;
        },
        addPage: function (page) {
            this._pages.push(page);
        },
        addPages: function (pages, parentName) {
            this._pages ||(this._pages = []);
            _.each(pages, function (page) {
                page.parentName = parentName;
                page.appName = this.name;
                this._pages.push(page);
                if (_.isArray(page.pages)) {
                    this.addPages(page.pages, page.name);
                }
            }, this);
        },
        registerPage: function (page) {
            page.route = '/' + this.getSlug() + page.route;
            this.mediator.trigger('page:register', page);
        },
        registerPages: function () {
            _.each(this.getPages(), function (page) {
                var pageRoute = this.calculatePageRoute(page.name, '');
                page.route = pageRoute;
                this.registerPage(page);
            }, this);
        },

        getSlug: function () {
            return this._appSlug;
        },
        setSlug: function (slug) {
            this._appSlug = slug;
        },
        // groupPagesByParent: function () {
        //     var pages = this.getPages();
        //     var grouped = _.groupBy(pages, function (page) {
        //         var groupKey = 'rootLevel';
        //         if (page.options.parentRouteName) {
        //             groupKey = page.options.parentRouteName;
        //         }
        //         return groupKey;
        //     });
        //     return grouped;
        // },
        // buildTree: function (branch, list) {
        //     //            http://stackoverflow.com/a/8523143
        //     console.log('buildTree', branch, list);
        //     if (typeof branch === 'undefined') {
        //         return null;
        //     }

        //     var tree = [];
        //     for (var i = 0; i < branch.length; i++) {
        //         tree.push({
        //             item: branch[i],
        //             children: this.buildTree(list[branch[i].options.routeName], list)
        //         });
        //     }
        //     return tree;

        // },
        calculatePageRoute: function (name, route) {
            var page = this.findPageByName(name);
            route = page.slug + route;
            if (page.slug) {
                route = '/' + route;
            }

            if (page.parentName) {
                return this.calculatePageRoute(page.parentName, route);
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
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
