'use strict';

define(function (require) {
    var BaseView = require('core/views/BaseView');
    var Factory = require('adviceFactory');
    var template = require('jst!./view2.html');

    return Factory.register('view2', {
        base: 'view',
        template: template,

        clobber:{
            toString: function(){
                return 'view2'; 
            
            } 
        }
    });
});
