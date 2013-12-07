'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var mediator = require('core/mediator');

    var Structure = Backbone.Collection.extend({

        constructor: function () {
            mediator.on('page:register', function (page) {
                this.add({
                    menuName: page.menuName,
                    route: page.route,
                    name: page.name,
                    parentName: page.parentName,
                    active: false
                });
            }, this);

            mediator.on('page:change', this.onPageChange, this);
            Backbone.Collection.apply(this, arguments);
        },

        onPageChange: function (obj) {
            var item = this.find(function (model) {
                return model.get('name') === obj.name;
            });

            this.invoke('set', {
                'active': false
            });

            if (item) {
                item.set('active', true);
            }
        }

    });

    return Structure;
});
