'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var mediator = require('./mediator');

    var BaseView = Backbone.View.extend({
        constructor: function () {
            this._subViews = {};
            this.mediator = mediator;

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

        template: _.template(''),

        data: function () {
            return {};
        },

        addSubViews: function (obj) {
            this._subViews = _.extend(this._subViews, obj);
        },

        renderSubViews: function () {
            _.each(this._subViews, function (view, selector) {
                if (view && selector) {
                    view.setElement(this.$(selector))
                        .render();
                }
            }, this);
        },

        render: function () {
            var html = this.template(this.data(), {
                variable: 'data'
            });

//            console.log('render ' + this + ' ' + this.cid, html);

            this.$el.html(html);
            this.renderSubViews();
            this.trigger('render');
            return this;
        },

        afterRender: function () {

        },

        close: function () {
            this.closeSubViews();
            this.undelegateEvents();
            this.remove();
        },

        closeSubViews: function () {
            _.invoke(this._subViews, 'close');
        }

    });

    return BaseView;

});
