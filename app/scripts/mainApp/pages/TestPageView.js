'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('text!./test-page.html');

    return PageView.extend({
        initialize: function () {
            console.log('init test page view');
        },
        pageSettings: {
            routeLink: '/test',
            routeName: 'test',
            pageLinkText: 'Test link',
            pageTitle: 'Test title'

        },
        template: template
    });

});
