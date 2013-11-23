'use strict';

define(function (require) {
    // var shared = require('core/shared');
    var PageView = require('core/PageView');
    var JST =require('JST');
     var template = require('jst!./test-sub-page.ejs');
 //   console.log('path', path())

//    var template = JST['app/scripts/testApp/pages/test-sub-page.ejs'];

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
