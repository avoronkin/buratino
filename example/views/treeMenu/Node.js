var ListView = require('buratino').Views.List;
var View = require('buratino').Views.View;
var template = require('./node.html');
var _ = require('underscore');
var mediator = require('buratino').mediator;

var Node = ListView.extend({
    template: template,
    // events: {
    //     'click': 'toggleState'
    // },
    tagName: 'li',
    initialize: function (options) {
        this.options = options;
        this.options.containerSelector = '.children';
        this.itemView = Node;
        this.model.set('collapsed', false);
        this.listenTo(this.model, 'change', function (model) {
            this.render();
            // console.log('model changed', model.toJSON())

        })
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

module.exports = Node;
