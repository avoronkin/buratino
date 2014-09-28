'use strict';

var ListView = require('buratino').Views.List;
var template = require('./node.html');
var _ = require('underscore');

var TreeNode = ListView.extend({
    template: template,
    tagName: 'li',
    initialize: function (options) {
        this.options = options;
        this.options.containerSelector = '.children';
        this.itemView = TreeNode;
        this.model.set('collapsed', false);

    },

    // events: {
    //     'click': 'toggleState'
    // },
    modelEvents: {
      'change': 'render'
    },

    toggleState: function (event) {
        event.stopPropagation();
        this.model.set('collapsed', !this.model.get('collapsed')); // !this.model.get('collapsed'));
    },

    getItems: function () {
        var itemCid = this.model.get('cid');
        var items = this.collection.filter(function (model) {
            return itemCid === model.get('parentCid');
        });

        return items;
    },

    data: function () {
        return _.extend(this.model.toJSON(), {
            hasChildren: this.model.hasChildren()
        });
    },

    toString: function () {
        return 'Node';
    }
});

module.exports = TreeNode;
