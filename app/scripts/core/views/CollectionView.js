'use strict';
define(function (require) {
    var Backbone = require('backbone');
    var baseRender = require('core/mixins/view/baseRender');
    var underscoreTemplate = require('core/mixins/view/underscoreTemplate');
    var afterRender = require('core/mixins/view/afterRender');
    var keepEl = require('core/mixins/view/keepEl');
    var subViews = require('core/mixins/view/subViews');
    var listView = require('core/mixins/view/listView');
    var advice = require('advice');

    advice.addMixin(Backbone.View);

    var CollectionView = Backbone.extend({

    }).mixin([baseRender, underscoreTemplate, afterRender, keepEl, subViews, listView]);

    return CollectionView;
});