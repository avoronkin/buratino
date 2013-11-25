'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('jst!./test-page.ejs');

    return PageView.extend({
        toString: function(){
            return 'TestPageView';
        },
        initialize: function () {
        },
        template: template
    });

});
