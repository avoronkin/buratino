'use strict';

define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var App = function (opt) {
        this._pages = [];
        this._apps = [];
        this.mediator = mediator;
        if (opt && (opt.slug || opt.slug === '')) {
            this.setAppSlug(opt.slug);
        }
        this.addPages(opt.pages);

        this.initialize.apply(this);
    };

    _.extend(App.prototype, {
        initialize: function () {
            console.log('init', this);
        },
        toString: function () {
            return 'App';
        },
        getPages: function () {
            return this._pages;
        },
        addApp: function (app) {
            this._apps.push(app);
        },
        getApps: function () {
            return this._apps;
        },
        addPage: function (page) {
            this._pages.push(page);
        },
        addPages: function(pages, parentName){
            _.each(pages, function(page){
                page.parentName = parentName; 
                this._pages.push(page);
                if(_.isArray(page.pages)){
                    this.addPages(page.pages, page.name); 
                }
            }, this);
            console.log('pages',this._pages, pages); 
        },
        getAppSlug: function () {
            return this._appSlug;
        },
        setAppSlug: function (slug) {
            this._appSlug = slug;
        },
        setMediator: function (mediator) {
            this.mediator = mediator;
        },
        registerApp: function (app) {

        },
        registerApps: function () {},
        registerPage: function (page) {
            page.route = '/' + this.getAppSlug() + page.route;
            console.log('reg',page)
            this.mediator.trigger('page:register', page);
        },
        registerPages: function () {
            _.each(this.getPages(), function (page) {
                var pageRoute = this.calculatePageRoute(page.name, '');
                page.route = pageRoute;
                this.registerPage(page);
            }, this);
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
            this.registerApps();
            this.registerPages();
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
