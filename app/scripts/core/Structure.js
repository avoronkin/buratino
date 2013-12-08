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

        onPageChange: function (page) {
            var item = this.find(function (model) {
                return model.get('name') === page.name;
            });

            this.invoke('set', {
                'active': false,
                'here': false
            });

            if (item) {
                var breadcrumbs = this._getBreadcrumb(page.name);

                _.invoke(breadcrumbs, 'set', {
                    'active': true
                });

                item.set('here', true);
            }
            console.log('root', this.getRoot(item));
            console.log('tree', this.getTree(this.getRoot(item)));

        },

        getCurrent: function () {
            var current = this.findWhere({
                'here': true
            });

            return current;
        },

        getRoot: function (node) {
            var parent = this.getParent(node);

            if (!parent) {
                return node;
            } else {
                return this.getRoot(parent);
            }
        },

        getParent: function (node) {
            var parent, parentName;

            if (node) {
                parentName = node.get('parentName');

                parent = this.findWhere({
                    'name': parentName
                });
            }

            return parent;
        },

        getChildrens: function (node) {
            var name, childrens = [];

            if (node) {
                name = node.get('name');
                childrens = this.where({
                    'parentName': name
                });
            }
            console.log('getChildrens', arguments, name, childrens, this.toJSON());

            return childrens;

        },

        getTree: function (start) {
            if(!start) return;
            var node = start.toJSON();
            node.childrens = [];
            var childrens = this.getChildrens(start);

            if (childrens && childrens.length > 0) {

                node.childrens = _.map(childrens, function (children) {
                    return this.getTree(children);
                }, this);

            }

            console.log('getTree', node, arguments, childrens);
            return node;
        },

        getBreadcrumbs: function (end) {
            var items = [];
            var models = false;

            if (end) {
                var endName = end.get('name');
                models = this._getBreadcrumb(endName);
            }

            if (models) {
                items = _.map(models, function (model) {
                    return model.toJSON();
                });
            }

            return items;
        },

        _getBreadcrumb: function (endName, items) {
            items = items || [];
            var item = this.findWhere({
                'name': endName
            });

            if (item) {
                items.push(item);
                var parentName = item.get('parentName');

                if (parentName) {
                    return this._getBreadcrumb(parentName, items);
                }
            }

            return items.reverse();
        }


    });

    return Structure;
});
