'use strict';

var ListView = require('buratino').Views.List;
var TreeNode = require('./Node');
var template = require('./tree.html');

module.exports = ListView.extend({
    template: template,
    containerSelector: '.children',
    itemView: TreeNode,

    initialize: function (options) {
        this.options = options;
    },

    collectionEvents: {
      'add remove reset change': 'render',
    },

    getItems: function () {
        var items = this.collection.filter(function (model) {
            return 'root' === model.get('parentCid');
        });
        return items;
    },

    toString: function () {
        return 'Tree';
    }
});
