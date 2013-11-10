'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('text!./main-page.html');

    return PageView.extend({
        initialize: function () {
            console.log('init main page view');
        },
        pageSettings: {
            routeLink: '',
            routeName: 'home',
            pageLinkText: 'Home link',
            pageTitle: 'Home title'
        },
        template: template
    });

});
