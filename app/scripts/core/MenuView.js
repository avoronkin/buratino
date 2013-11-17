'use strict';

define(function (require) {
    var CollectionView = require('./CollectionView');
    var _ = require('underscore');
    var JST = require('JST');
    var template = JST['app/scripts/core/templates/menu.ejs'];
    var itemTemplate = JST['app/scripts/core/templates/menu-item.ejs'];
    var BaseView = require('./BaseView');

    var MenuItem = BaseView.extend({
        template: itemTemplate,
        toString: function () {
            return 'MenuItem';
        },
        data: function () {
            var data = this.model.toJSON();
            return data;
        }
    });

    var MenuView = CollectionView.extend({
        constructor: function (options) {
            CollectionView.apply(this, arguments);
            this.setItemView(MenuItem);
        },
        initialize: function () {
        },
        toString: function () {
            return 'MenuView';
        },
        template: template
    });

    return MenuView;

});
