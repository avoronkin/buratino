'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var advice = require('advice');
    var baseRender = require('core/mixins/view/baseRender');
    var underscoreTemplate = require('core/mixins/view/underscoreTemplate');
    var afterRender = require('core/mixins/view/afterRender');
    var keepEl = require('core/mixins/view/keepEl');
    var subViews = require('core/mixins/view/subViews');

    advice.addMixin(Backbone.View);

    return Backbone.View.extend({

    }).mixin([baseRender, underscoreTemplate, afterRender, keepEl, subViews]);

});
