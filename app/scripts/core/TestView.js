'use strict';

define(function(require){
    var View = require('core/View');
    var advice = require('advice');
    var afterRender = require('core/mixins/afterRender');
    var keepEl = require('core/mixins/keepEl');
    var subViews = require('core/mixins/subViews');

    return View.extend({
    
        afterRender: function(){
            console.log('afterRender');
        }

    }).mixin([afterRender, keepEl, subViews]);

});
