var ListView = require('buratino').Views.List;
var View = require('buratino').Views.View;
var Node = require('./Node');
var template = require('./tree.html');

module.exports = ListView.extend({
    template: template,
    containerSelector: '.children',
    itemView: Node,

    initialize: function (options) {
        this.options = options;
        this.listenTo(this.collection, 'add remove reset', this.render);
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
