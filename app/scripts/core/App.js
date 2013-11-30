'use strict';

define(function (require) {
    var _ = require('underscore');
    var mediator = require('core/mediator');
    var Backbone = require('backbone');

    var App = function (options) {
        options || (options = {});
        var name = options.name || 'App';
        var controllers = [];
        var apps = [];
        var slug;

        this.getApps = function () {
            return apps;
        };

        this.getControllers = function () {
            return controllers;
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
        console.log('app options', options)
        this.addApps(options.apps);
        this.addControllers(options.controllers, options.parentController);
        this.initialize.apply(this);
    };


    _.extend(App.prototype, {

        initialize: function () {
            console.log('init ' + this, this.getControllers());
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
            if(app.parentController){
                app.config.parentController = app.parentController;
            }
            console.log('register app', app);
            var a = new App(app.config);
            a.start();
        },

        registerApps: function () {
            _.each(this.getApps(), this.registerApp, this);
        },

        addController: function (controller, parentName) {
            var controllers = this.getControllers();
            controller.parentName = parentName;
            controller.appName = this.getName();

            controllers.push(controller);

            if (_.isArray(controller.controllers)) {
                this.addControllers(controller.controllers, controller.name);
            }
        },

        addControllers: function (controllers, parentName) {
            _.each(controllers, function (controller) {
                this.addController(controller, parentName);
            }, this);
        },

        registerController: function (controller) {
            controller.route = '/' + this.getSlug() + this.calculateControllerRoute(controller.name, '');
            mediator.trigger('page:register', controller);
        },

        registerControllers: function () {
            _.each(this.getControllers(), this.registerController, this);
        },

        calculateControllerRoute: function (name, route) {
            var controller = this.findControllerByName(name);
            console.log('calculateControllerRoute', controller);
            if (controller && controller.slug) {
                route = controller.slug + route;
                route = '/' + route;
            }

            if (controller && controller.parentName) {
                return this.calculateControllerRoute(controller.parentName, route);
            } else {
                return route;
            }
        },

        findControllerByName: function (name) {
            var controllers = this.getControllers();

            var controller = _.find(controllers, function (controller) {
                return controller.name === name;
            });

            return controller;
        },

        start: function () {
            console.log('start ' + this, this);
            this.registerControllers();
            this.registerApps();
            return this;
        }

    });

    App.extend = Backbone.View.extend;

    return App;
});
