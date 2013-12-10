'use strict';

define(function (require) {
    var _ = require('underscore');

    var regionsMixin = function () {

        this.before('initialize', function (options) {
            options = options || {};
            this.views = options.views || {};
        });

        this.setDefaults({
            renderSubViews: function () {
                _.each(this.views, function (view, el) {
                    if(!view.instance){
                        view.instance = new view.constructor(view.options);
                    }
                    view.instance.setElement(el).render();
                });
            },

            removeSubViews: function () {
                _.each(this.views, function (view) {
                    if (view.instance) {
                        view.instance.remove();
                    }
                });
            }
        });

        this.around('render', function (render) {
            render();
            this.renderSubViews();
            return this;
        });

        this.around('remove', function (remove) {
            this.removeSubViews();
            remove();
            // console.log('remove ' + this, this);
            return this;
        });

    };

    return regionsMixin;
});
