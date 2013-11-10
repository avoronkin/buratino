'use strict';
define(function (require) {
    var BaseView = require('./BaseView');

    var PageView = BaseView.extend({
        data: function () {
            var data;
            //      data.routerParams = this.routerParams;
            return data;
        },
        register: function () {
            var view = this;
            var settings = view.pageSettings;
            view.options.router.route(settings.routeName, settings.routeLink, function (routeParams) {
                view.routeParams = routeParams;
                view.options.mediator.trigger('page:change', {
                    view: view
                });
                view.options.mediator.trigger('title:change', settings.pageTitle, view);

            });
        }

    }, {
        pageSettings: {
            routeLink: 'routeLink',
            routeParams: {},
            routeName: 'routeName',
            pageLinkText: 'pageLinkText',
            pageTitle: 'pageTitle'
        }

    });

    return PageView;
});
