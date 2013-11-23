'use strict';

define(function (require) {
    var JST = require('JST');
    var defaultOuterTpl = JST['app/scripts/core/menu/templates/default/outerTpl.ejs'];
    var BaseView = require('core/BaseView');
    var _ = require('underscore');

    var MenuView = BaseView.extend({
        constructor: function (options) {
            BaseView.apply(this, arguments);
            this.template = options.outerTpl ? options.outerTpl : defaultOuterTpl;
            this.listenTo(this.collection, 'add remove change', this.render);
        },
        data: function () {
            var data = {};
            if (this.options.parentName) {
                var models = this.collection.filter(function (model) {
                    return model.get('parentName') === this.options.parentName;
                }, this);
                data.items = _.map(models, function (model) {
                    return model.toJSON();
                });
            } else {
                data.items = this.collection.toJSON();
            }
            console.log('data', data, this.options.parentName);
            return data;
        },
        toString: function () {
            return 'MenuView';
        }
    });

    return MenuView;

});
