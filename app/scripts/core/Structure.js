'use strict';

define(function (require) {
    var Backbone = require('backbone');
    var mediator = require('core/mediator');
    var _ = require('underscore');

    var Node = Backbone.Model.extend({
        nodeId: 'name',
        nodeParentId: 'parentName',

        addChildren: function (model) {
            model.set(this.nodeParentId, this.get(this.nodeId));
            this.collection.add(model);
        },

        isRoot: function(){
            return this.getParent() === undefined;
        },

        getRoot: function () {
            var parent = this.getParent();

            return parent ? parent.getRoot() : this;
        },

        getParent: function () {
            var parent,
                parentId = this.get(this.nodeParentId),
                whereClause = {};


            if (parentId) {
                whereClause[this.nodeId] = parentId;

                parent = this.collection.findWhere(whereClause);
            }

            return parent;
        },

        getChildrens: function () {
            var whereClause = {};

            whereClause[this.nodeParentId] = this.get(this.nodeId);

            return this.collection.where(whereClause);
        },

        getPatch: function (models) {
            models = models || [];

            models.unshift(this);

            return this.isRoot() ? models : this.getParent().getPatch(models);
        },

        toJSON: function () {
            var node = _.clone(this.attributes),
                childrens = this.getChildrens();

            node.childrens = _.invoke(childrens,'toJSON');

            return node;
        }

    });


    var Structure = Backbone.Collection.extend({
        model: Node,

        constructor: function () {
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
