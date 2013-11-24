'use strict';

define(function (require) {
    var PageView = require('core/PageView');
    var template = require('jst!./test-sub-page.ejs');

    return PageView.extend({
        toString: function(){
            return 'TestPageView';
        },
        data: function(){
            return {test: 'wertyuio'}; 
        },
        initialize: function () {
        },
        template: template
    });

});
