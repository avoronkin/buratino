'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('text!./main-page.html');

    return PageView.extend({
        toString: function(){
            return 'MainPageView';
        },
        // initialize: function () {
        // },
        template: template
    });

});
