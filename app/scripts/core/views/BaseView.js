'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var baseRender = require('core/mixins/view/baseRender');
    var underscoreTemplate = require('core/mixins/view/underscoreTemplate');
    var afterRender = require('core/mixins/view/afterRender');
    var keepEl = require('core/mixins/view/keepEl');
    var subViews = require('core/mixins/view/subViews');
    var Factory = require('adviceFactory');

    return Factory.register('view',{
        base: Backbone.View,

        mixins: [
            baseRender,
            underscoreTemplate,
            afterRender,
            keepEl,
            subViews
        ],

        clobber: {
            toString: function(){
                return 'BaseView';
            }
        }
    });

});
