var Backbone = require('backbone');
var treeModelMixin = require('backbone.model.tree.mixin');
var _ = require('underscore');


var Page = Backbone.Model.extend(_.extend(treeModelMixin, {
    initialize: function () {
        this.set('cid', this.cid);
    },

    hasChildren: function () {
        var cid = this.get('cid');

        var children = this.collection.filter(function (model) {
            return cid === model.get('parentCid');
        });

        return !!children.length;
    }
}));

module.exports = Page;