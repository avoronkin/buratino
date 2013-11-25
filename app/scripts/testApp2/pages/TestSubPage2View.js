'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var template = require('jst!./test-sub-page2.ejs');

    return PageView.extend({
        toString: function(){
            return 'TestSubPage2View';
        },
        initialize: function () {
        },
        template: template
    });

});
