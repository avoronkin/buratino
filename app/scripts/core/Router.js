'use strict';

define(function (require) {
    var crossroads = require('crossroads');
    require('history');
    var $ = require('jquery');
    var _ = require('underscore');

    var Router = function () {
        var routes = {};
        var excluded = [];

        var start = function () {
            crossroads.normalizeFn = crossroads.NORM_AS_OBJECT;
            //crossroads.routed.add(console.log, console);
            crossroads.parse(_getStatePath());

            History.Adapter.bind(window, 'statechange', function () {
                //console.log('statechange',_getStatePath())
                crossroads.parse(_getStatePath());
            });

            $('body').on('click', 'a[href^="/"]', function (event) {
                if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {

                    var path = $(event.currentTarget).attr('href'); //.replace(/^\//, "");

                    if (!_.contains(excluded, path)) {
                        //console.log('clicked', path);
                        event.preventDefault();
                        goToUrl(path);
                    }

                }
            });

        };

        var exclude = function (path) {
            excluded.push(path);
        };

        var route = function (name, pattern, handler, priority) {
            routes[name] = routes[name] || {};
            routes[name] = crossroads.addRoute(pattern, handler, priority);
            return routes[name];
        };

        var _getStatePath = function () {
            var State = History.getState();
            var path = State.url.replace(location.origin, '');//+ '/'
            //console.log('state', path, State)
            return path;
        };

        var url = function (name, replacements) {
            return '/' + routes[name].interpolate(replacements);
        };

        var navigate = function (name, replacements) {
            var path = url(name, replacements);
            goToUrl(path);
            //History.pushState(null, null, path);
        };

        var goToUrl = function (path) {
            History.pushState(null, null, path);
        };


        return {
            start: start,
            route: route,
            navigate: navigate,
            url: url,
            exclude: exclude
        };
    };


    return Router;

});
