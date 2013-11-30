'use strict';
define(function (require) {
    var _ = require('underscore');
    var BaseView = require('core/views/BaseView');

    var CollectionView = BaseView.extend({
        constructor: function (options) {
            options = options || {};
            this._views = [];
            this.setItemView(options.ItemView ? options.ItemView : BaseView);
            this.setItemViewOptions((options.ItemViewOptions ? options.ItemViewOptions : {}));
            BaseView.apply(this, arguments);
            this.on('render', function(){
                this.collection.on('reset add remove', this.renderViews, this);
            });

        },
        data: function(){
            var data = {};
            return data; 
        },
        setItemView: function (ItemView) {
            this.ItemView = ItemView;
        },
        getItemView: function () {
            return this.ItemView;
        },
        getItemViewOptions: function () {
            return this.ItemViewOptions;
        },
        setItemViewOptions: function (ItemViewOptions) {
            this.ItemViewOptions = ItemViewOptions;
        },
        render: function(){
            BaseView.prototype.render.apply(this);

            if (this.options.itemsContainerSelector) {
                this.$itemsContainerEl = this.$(this.options.itemsContainerSelector);
            } else {
                this.$itemsContainerEl = this.$el;
            }

            this.renderViews();
            return this;
        },

        renderViews: function () {
            var ItemView = this.getItemView();
            var ItemViewOptions = this.getItemViewOptions();
            var view;
            var container = document.createDocumentFragment();

            this.closeViews();

            this.collection.each(function (model) {
                view = new ItemView(_.extend(ItemViewOptions, {
                    model: model
                }));
                this._views.push(view);
                container.appendChild(view.render().el);
            }, this);

            this.$itemsContainerEl.append(container);
        },

        closeViews: function () {
            _.invoke(this._views, 'close');
        }
    });

    return CollectionView;
});
