'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var mediator = require('core/mediator');
    var _ = require('underscore');

    var Node = Backbone.Model.extend({
        nodeId: 'name',
        nodeParentId: 'parentName',

        addNode: function (nodeModel) {
            nodeModel.set(this.nodeParentId, this.get('name'));
            this.collection.add(nodeModel);
        },

        getRoot: function () {
            var parent = this.getParent();

            if (!parent) {
                return this;
            } else {
                return parent.getRoot();
            }
        },

        getParent: function () {
            var parent, parentId, where = {};

            parentId = this.get(this.nodeParentId);

            if (parentId) {
                where[this.nodeId] = parentId;

                parent = this.collection.findWhere(where);
            }

            return parent;
        },

        getChildrens: function () {
            var nodeId, childrens = [],
                where = {};

            nodeId = this.get(this.nodeId);
            where[this.nodeParentId] = nodeId;

            childrens = this.collection.where(where);

            return childrens;

        },

        getTree: function getTree() {
            var node = this.toJSON();
            var models = this.getChildrens();

            node.childrens = _.map(models, function (model) {
                return model.getTree();
            }, this);

            return node;
        },

        getBreadcrumbs: function () {
            return this._getBreadcrumbs();
        },

        _getBreadcrumbs: function (models) {
            var parent = this.getParent();

            models = models || [];

            models.push(this);


            if (parent) {
                return parent._getBreadcrumbs(models);
            } else {
                return models.reverse();
            }
        }

    });


    var Structure = Backbone.Collection.extend({
        model: Node,

        constructor: function () {
            // mediator.on('page:register', function (page) {
            //     this.add({
            //         menuName: page.menuName,
            //         route: page.route,
            //         name: page.name,
            //         parentName: page.parentName,
            //         active: false,
            //         here: false
            //     });
            // }, this);

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
            }, {
                silent: true
            });


            if (item) {
                var models = item.getBreadcrumbs();

                _.invoke(models, 'set', {
                    'active': true
                });

                item.set('here', true);
                this.trigger('changed');
            }
        },

        getCurrent: function () {
            var current = this.findWhere({
                'here': true
            });

            return current;
        }

    });

    return Structure;
});
