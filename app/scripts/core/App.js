'use strict';

define(function (require) {
    var _ = require('underscore');
    var Backbone = require('backbone');
    var mediator = require('./mediator');

    var App = function (opt) {
        this._pages = [];
        this._mediator = mediator;
        if (opt && (opt.appUrl || opt.appUrl === '')) {
            this.setAppUrl(opt.appUrl);
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
        getAppUrl: function () {
            return this._appUrl;
        },
        setAppUrl: function (url) {
            this._appUrl = url;
        },
        setMediator: function (mediator) {
            this._mediator = mediator;
        },
        register: function (page) {
            page.options.routeLink = this.getAppUrl() + page.options.routeLink;
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
        calculatePageRoute: function (routeName, route) {
            var page = this.findPageByRouteName(routeName);
            route = page.options.routeLink + route;
            if (page.options.parentRouteName) {
                return this.calculatePageRoute(page.options.parentRouteName, route);
            } else {
                return route;
            }
        },
        findPageByRouteName: function (routeName) {
            var pages = this.getPages();
            var page = _.find(pages, function (page) {
                return page.options.routeName === routeName;
            });

            return page;
        },
        start: function () {
            //var grouped = this.groupPagesByParent();
            //var tree = this.buildTree(grouped.rootLevel, grouped);
            console.log('start ' + this,this);

            _.each(this.getPages(), function (page) {
                var pageRoute = this.calculatePageRoute(page.options.routeName, '');
                page.options.routeLink = pageRoute;
                this.register(page);
            }, this);
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
