    var crossroads = require('crossroads');
    require('nor-history.js');
    var _ = require('underscore');
    var mediator = require('./mediator');

    var Router = function () {
        this._routes = {};
        this.initialize.apply();
        mediator.on('page:start', this.registerRoute, this);
    };

    _.extend(Router.prototype, {
        initialize: function () {},

        registerRoute: function (page) {
            this.route(page.get('name'), page.get('route'), function (routeParams) {
                page.routeParams = routeParams;
                mediator.trigger('page:change', page);
            });
        },

        start: function () {
            var self = this;
            crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
            crossroads.parse(this._getStatePath());

            History.Adapter.bind(window, 'statechange', function () {
                crossroads.parse(self._getStatePath());
            });

            mediator.trigger('router:start');
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


    module.exports = Router;
