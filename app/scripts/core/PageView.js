'use strict';
define(function (require) {
    var BaseView = require('./BaseView');

    var PageView = BaseView.extend({
        data: function () {
            var data;
            //      data.routerParams = this.routerParams;
            return data;
        },
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
