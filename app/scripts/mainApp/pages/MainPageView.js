'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var JST = require('JST');
    var template = JST['app/scripts/mainApp/pages/main-page.ejs'];

    return PageView.extend({
        toString: function(){
            return 'MainPageView';
        },
        // initialize: function () {
        // },
        template: template
    });

});
