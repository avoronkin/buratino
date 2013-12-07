'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var baseRender = require('core/mixins/view/baseRender');
    var underscoreTemplate = require('core/mixins/view/underscoreTemplate');
    var helpers = require('core/mixins/view/helpers');

    var afterRender = require('core/mixins/view/afterRender');
    var keepEl = require('core/mixins/view/keepEl');
    var subViews = require('core/mixins/view/subViews');
    var Factory = require('adviceFactory');

    return Factory.register('view', {
        base: Backbone.View,

        mixins: [
            baseRender,
            underscoreTemplate,
            helpers,
            afterRender,
            keepEl,
            subViews
        ],

        setDefaults: {
        },

        clobber: {
            getHelpers: function () {
                return {
                    helpers: {
                        test: function () {
                            return 'hello world!';
                        }
                    }
                };
            },
            toString: function () {
                return 'BaseView';
            }
        }
    });

});
