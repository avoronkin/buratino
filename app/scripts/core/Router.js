'use strict';

define(function (require) {
    var crossroads = require('crossroads');
    require('history');
    var _ = require('underscore');
    var mediator = require('./mediator');

    var Router = function (opt) {
        var self = this;
        this._routes = {};
        this._mediator = mediator;

        this._mediator.on('page:register', function (page) {
            self.route(page.options.name, page.options.route, function (routeParams) {
                page.routeParams = routeParams;
                self._mediator.trigger('page:change', {
                    view: page
                });
                self._mediator.trigger('title:change', page.title);

            });

        });
    };

    _.extend(Router.prototype, {

        start: function () {
            var self = this;
            crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
            crossroads.parse(this._getStatePath());

            History.Adapter.bind(window, 'statechange', function () {
                crossroads.parse(self._getStatePath());
            });

            this._mediator.trigger('router:start');
        },

        route: function (name, pattern, handler, priority) {
            this._routes[name] = this._routes[name] || {};
            this._routes[name] = crossroads.addRoute(pattern, handler, priority);
            return this._routes[name];
        },

        _getStatePath: function () {
            var State = History.getState();
            var path = State.url.replace(location.origin, '');
            return path;
        },

        url: function (name, replacements) {
            return '/' + this._routes[name].interpolate(replacements);
        },

        navigate: function (name, replacements) {
            var path = this.url(name, replacements);
            this.goToUrl(path);
        },

        goToUrl: function (path) {
            History.pushState(null, null, path);
        }

    });


    return Router;

});
