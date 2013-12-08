'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var mediator = require('core/mediator');
    var _ = require('underscore');

    var Structure = Backbone.Collection.extend({

        constructor: function () {
            mediator.on('page:register', function (page) {
                this.add({
                    menuName: page.menuName,
                    route: page.route,
                    name: page.name,
                    parentName: page.parentName,
                    active: false,
                    here: false
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
                'active': false,
                'here': false
            });

            if (item) {
                item.set('active', true);
                item.set('here', true);
            }

        },

        getCurrent: function () {
            var current = this.find(function (model) {
                return model.get('here');
            });
            console.log('getCurrent', current);

            return current;
        },

        getTree: function (start) {
            var tree;
            return tree;
        },

        getBreadcrumbs: function () {
            var items = [];
            var page = this.getCurrent();
            if (page) {
                var endName = page.get('name');
                var models = this._getBreadcrumb(endName, []);
                
                console.log('getBreadcrumbs',page.get('name'),models,items);
                if (models) {
                    items = _.map(models, function (model) {
                        return model.toJSON();
                    });
                }

            }

            return items;
        },

        _getBreadcrumb: function (endName, items) {
            var item = this.find(function (model) {
                return model.get('name') === endName;
            });
            console.log('_getBreadcrumb', endName, items,item,this);

            if (item) {
                items.push(item);
            }

            if (item && item.get('parentName')) {
                return this._getBreadcrumb(item.get('parentName'), items);
            } else {
                console.log('_getBreadcrumb return',items);
                return items;
            }

        }


    });

    return Structure;
});
