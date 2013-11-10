'use strict';
define(function (require) {
    var _ = require('underscore');
    var BaseView = require('./BaseView');

    var CollectionView = BaseView.extend({
        constructor: function (options) {
            this._views = [];
            if (!options || !options.ItemView) {
                throw new Error('Where ItemView???');
            }
            this.ItemView = options.ItemView;
            this.ItemViewOptions = options.ItemViewOptions ? options.ItemViewOptions : {};
            BaseView.apply(this, arguments);
        },

        renderViews: function () {
            this.closeViews();
            var container = document.createDocumentFragment();
            var view;
            this.collection.each(function (model) {
                view = new this.ItemView(_.extend(this.ItemViewOptions, {
                    model: model
                }));
                this._views.push(view);
                container.appendChild(view.render().el);
            }, this);

            this.$el.append(container);
        },

        closeViews: function () {
            _.invoke(this._views, 'close');
        }
    });

    return  CollectionView;
});
