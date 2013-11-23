'use strict';

define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var App = function (opt) {
        this._pages = [];
        this._mediator = mediator;
        if (opt && (opt.slug || opt.slug === '')) {
            this.setAppSlug(opt.slug);
        }

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
        addPage: function (page) {
            this._pages.push(page);
        },
        getAppSlug: function () {
            return this._appSlug;
        },
        setAppSlug: function (slug) {
            this._appSlug = slug;
        },
        setMediator: function (mediator) {
            this._mediator = mediator;
        },
        register: function (page) {
            page.options.route = this.getAppSlug() + page.options.route;
            this._mediator.trigger('page:register', page);
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
            route = page.options.slug + route;
            if (page.options.parentName) {
                return this.calculatePageRoute(page.options.parentName, route);
            } else {
                return route;
            }
        },
        findPageByName: function (name) {
            var pages = this.getPages();
            var page = _.find(pages, function (page) {
                return page.options.name === name;
            });

            return page;
        },
        start: function () {
            console.log('start ' + this,this);

            _.each(this.getPages(), function (page) {
                var pageRoute = this.calculatePageRoute(page.options.name, '');
                page.options.route = pageRoute;
                this.register(page);
            }, this);
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
