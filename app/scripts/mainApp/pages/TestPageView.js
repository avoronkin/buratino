'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('text!./test-page.html');

    return PageView.extend({
        toString: function(){
            return 'TestPageView';
        },
        initialize: function () {
        },
        template: template
    });

});
