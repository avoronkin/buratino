'use strict';

define(function (require) {
    var _ = require('underscore');

    var subViewsMixin = function () {

        this.before('initialize', function (options) {
            this.views = options.views || {};
        });

        this.setDefaults({

            renderSubViews: function () {
                _.each(this.views, function (view, selector) {
                    if (view && selector) {
                        view.setElement(this.$(selector))
                            .render();
                    }
                }, this);
            },

            closeSubViews: function () {
                _.invoke(this.views, 'close');
            }
        });

        this.around('render', function (render) {
            render();
            this.renderSubViews();
            return this;
        });

        this.before('close', function () {
            this.closeSubViews();
        });

    };

    return subViewsMixin;
});
