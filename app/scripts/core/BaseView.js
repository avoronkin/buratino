'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var mediator = require('./mediator');
    var template = require('jst!./templates/default.ejs');

    var BaseView = Backbone.View.extend({
        constructor: function (options) {
            this.mediator = mediator;
            this.views = options.views || {};
            this.keepEl = options.keepEl || true;

            this.render = _.wrap(this.render, function (render) {
                render.apply(this);
                this.afterRender.apply(this);
                return this;
            });

            Backbone.View.apply(this, arguments);
        },

        toString: function () {
            return 'BaseView';
        },

        template: template,

        data: function () {
            return {};
        },

        render: function () {
            var html = this.template(this.data(), {
                variable: 'data'
            });

            this.$el.html(html);
            this.renderSubViews();
            return this;
        },

        afterRender: function () {},

        remove: function () {
            if (this.keepEl) {
                this.$el.html('');
            } else {
                this.$el.remove();
            }

            this.stopListening();
            return this;
        },

        close: function () {
            this.closeSubViews();
            this.remove();
        },

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

    return BaseView;

});
