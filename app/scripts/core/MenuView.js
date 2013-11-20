'use strict';

define(function (require) {
    var JST = require('JST');
    var template = JST['app/scripts/core/templates/menu.ejs'];
    var BaseView = require('./BaseView');

    var MenuView = BaseView.extend({
        initialize: function () {
            this.listenTo(this.collection, 'change', this.render);
        },
        tagName: 'nav',
        className: 'top-bar',
        data: function () {
            return {
                items: this.collection.toJSON()
            };
        },
        toString: function () {
            return 'MenuView';
        },
        template: template
    });

    return MenuView;

});
