'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('jst!./main-page.ejs');

    return PageView.extend({
        toString: function(){
            return 'MainPageView';
        },
        template: template
    });

});
